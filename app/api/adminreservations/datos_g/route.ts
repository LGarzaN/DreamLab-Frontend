import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'

export async function GET(req: NextRequest) {
    try {
        const jwt = req.cookies.get("session")?.value;
        console.log(jwt)
        if (!jwt) {
            return new Response("Unauthorized", {
                status: 401
            })
        }

        const data = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
        
        const res = await axios.get(`http://127.0.0.1:8000/admin/estadisticasgeneral`, {
            headers: {
                "x-api-key": process.env.API_KEY
            }
        });

        const reservations = res.data;
        return new Response(JSON.stringify(reservations), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (e) {
        console.log(e);
        return new Response("Internal Server Error", {
            status: 500
        });
    }
}