import axios from "axios";
import { NextRequest } from "next/server";
import { jwtVerify } from 'jose'


export async function GET(req: NextRequest) {
    try {
        const jwt = req.cookies.get("session")?.value;
        if (!jwt) {
            return new Response("Unauthorized", {
                status: 401
            })
        }
        const data = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
        console.log(data)
        const userId = data.payload.userId
        const res = await axios.get(`https://dlbackendtws.azurewebsites.net/reservations/${userId}`, {
            headers: {
                "x-api-key": process.env.API_KEY
            }
        })
        console.log(res.data)

        const reservations = res.data;
        return new Response(JSON.stringify(reservations), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (e) {
        console.log(e)

    }
}

export async function POST(req: NextRequest) {
    try {
        const jwt = req.cookies.get("session")?.value;
        if (!jwt) {
            return new Response("Unauthorized", {
                status: 401
            })
        }
        const data = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = data.payload.userId
        const body = await req.json();
        const newBody = {
            ...body,
            user_id: userId
        }
        const res = await axios.post(`https://dlbackendtws.azurewebsites.net/reservations/create`, newBody, {
            headers: {
                "x-api-key": process.env.API_KEY
            }
        })
        return new Response(JSON.stringify(res.data), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (e) {
        console.log(e)

    }
}

export async function DELETE(req: NextRequest) {
    try {
        const jwt = req.cookies.get("session")?.value;
        if (!jwt) {
            return new Response("Unauthorized", {
                status: 401
            })
        }
        const data = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = data.payload.userId
        const body = await req.json();
        const res = await axios.delete(`https://dlbackendtws.azurewebsites.net/reservations/`, {
            headers: {
                "x-api-key": process.env.API_KEY
            },
            data: {
                group_code: body.group_code,
                user_id: userId
            }
        })
        return new Response(JSON.stringify(res.data), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (e) {
        console.log(e)

    }
}