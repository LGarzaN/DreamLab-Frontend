
export async function POST(req: Request) {
    console.log("POST request received")
    try {
        const body = await req.json()
        const playerText = body.playerText
        const id = body.id
        const promptResponse = await fetch("http://127.0.0.1:8000/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "session_id": id,
                "prompt": playerText
            })
        })
        const npcText = await promptResponse.json()
        console.log(npcText)
        return new Response(JSON.stringify({
            npcText: npcText
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