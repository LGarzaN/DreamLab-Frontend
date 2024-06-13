import axios from "axios";
import { NextRequest } from "next/server";
import { jwtVerify } from 'jose'

export async function GET(req: NextRequest) {
    try {
        const jwt = req.cookies.get("session")?.value;
        if (!jwt) {
            return new Response("Unauthorized", {
                status: 401
            });
        }

        const { payload: { userId } } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));

        const res = await axios.get(`https://dlbackendtws.azurewebsites.net/reservations/historial/${userId}`, {
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
    } catch (e: any) {
        console.error(e);
        if (e.response && e.response.status === 401) {
            return new Response("Unauthorized", {
                status: 401
            });
        }
        return new Response("Internal Server Error", {
            status: 500
        });
    }
}
