import axios from "axios";
import { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

export async function GET(req: NextRequest) {
    try {
        const jwt = req.cookies.get("session")?.value;
        if (!jwt) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = payload.userId;

        const statsResponse = await axios.get(`https://dlbackendtws.azurewebsites.net/user/statistics/${userId}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });

        const { reservations, studyHours, exploredAreas } = statsResponse.data;

        return new Response(JSON.stringify({ reservations, studyHours, exploredAreas }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (e: any) {
        console.error(e);
        
        const status = e.response?.status || 500;
        const message = e.response?.data?.message || e.message;

        return new Response(JSON.stringify({ error: message }), {
            status: status,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
