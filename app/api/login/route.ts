import { NextResponse } from "next/server"
import axios from "axios"

//"https://dlbackendtws.azurewebsites.net/login/"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const username = body.username
        const password = body.password
        
        const res = await axios.post('https://dlbackendtws.azurewebsites.net/login/', {
            username,
            password
        })

        const response = await res.data;
        const sessionToken = response.token;

        const nextResponse = new NextResponse(JSON.stringify({}), {
            status: res.status,
            headers: {
                "Content-Type": "application/json"
            }
        });

        nextResponse.cookies.set("session", sessionToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 12 * 60 * 60 * 1000)
        });

        return nextResponse;
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({
            error: e
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}