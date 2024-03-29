
export async function POST(req: Request) {
    console.log("POST request received")
    try {
        const body = await req.json()
        const playerText = body.playerText
        const id = body.id
        const promptResponse = await fetch("https://dlbackendtws.azurewebsites.net/chat", {
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