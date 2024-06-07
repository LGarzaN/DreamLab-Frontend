
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const playerText = body.message
        const id = body.thread_id
        const promptResponse = await fetch("https://dlchatbot2.azurewebsites.net/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "thread_id": id,
                "message": playerText
            })
        })
        const response = await promptResponse.json()
        return new Response(JSON.stringify({
            response
        }), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({
            error: e
        }), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}