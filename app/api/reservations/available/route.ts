import axios from "axios"

export async function GET() {
    try {
        const res = await axios.get(`https://dlbackendtws.azurewebsites.net/admin/available-spaces`, {
            headers: {
                "x-api-key": process.env.API_KEY
            }
        })
        const spaces = res.data;
        return new Response(JSON.stringify(spaces), {
            headers: {
                "Content-Type": "application/json",
            }
        })
    }
    catch (e) {
        console.log(e)
        return new Response("Unauthorized", {
            status: 401
        })
    }
}