import { NextResponse } from "next/server"
import axios from "axios"
import { headers } from "next/headers"

//"https://dlbackendtws.azurewebsites.net/login/"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const username = body.username
        const password = body.password

        console.log(process.env.API_KEY)
        
        const res = await axios.post('https://dlbackendtws.azurewebsites.net/login/', {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
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
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            secure: true
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
