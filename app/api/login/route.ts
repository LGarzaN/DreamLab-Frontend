export async function POST(req: Request) {
    try {
        const body = await req.json()
        const username = body.username
        const password= body.password
        const res = await fetch("https://dlbackendtws.azurewebsites.net/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        const response = await res.json()
        return new Response(JSON.stringify({
            response: response
        }), {
            status: res.status,
            headers: {
                "Content-Type": "application/json"
            }
        })
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