import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const response = new NextResponse(JSON.stringify({}), {
            status: 200,
        });
        response.cookies.set("session", "", {
            maxAge: 0,
            path: "/"
        });
        return response;
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({
            error: e
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}