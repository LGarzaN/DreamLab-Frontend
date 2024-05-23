import axios from "axios";
import { NextRequest } from "next/server";
import { jwtVerify } from 'jose'


export async function GET(req: NextRequest) {
    try {
        //check if the request came from the /videowall page
        if (req.headers.get("source") && req.headers.get("source") === "videowall") {
            console.log("videowall")
            return new Response(JSON.stringify(vwreservations), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        const jwt = req.cookies.get("session")?.value;
        if (!jwt) {
            return new Response("Unauthorized", {
                status: 401
            })
        }


        const data = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = data.payload.userId
        const res = await axios.get(`https://dlbackendtws.azurewebsites.net/reservations/${userId}`, {
            headers: {
                "x-api-key": process.env.API_KEY
            }
        })

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
        // get header
        const reservationType = req.headers.get("reservation-type")
        const data = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET));
        const userId = data.payload.userId
        const body = await req.json();
        const res = await axios.delete(`https://dlbackendtws.azurewebsites.net/reservations/`, {
            headers: {
                "x-api-key": process.env.API_KEY,
                "reservation-type": reservationType
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


const vwreservations = [
    {
        Username: 'A01721881',
        Day: '2024-05-01',
        StartHour: '18:00',
        EndHour: '19:00',
        SpaceName: 'Social Networking',
        SpaceId: 1,
        RequirementsId: '1,2,4',
        RequirementsQuantity: '1,3,6',
        GroupCode: '5ee4e77'
    },
    {
        Username: 'A01721881',
        Day: '2024-05-01',
        StartHour: '18:00',
        EndHour: '19:00',
        SpaceName: 'Lego Room',
        SpaceId: 2,
        RequirementsId: '1,2,4',
        RequirementsQuantity: '1,3,6',
        GroupCode: '5ee4e77'
    },
    {
        Username: 'A01721881',
        Day: '2024-05-01',
        StartHour: '18:00',
        EndHour: '19:00',
        SpaceName: 'Electric Garage',
        SpaceId: 3,
        RequirementsId: '1,2,4',
        RequirementsQuantity: '1,3,6',
        GroupCode: '5ee4e77'
    },
    {
        Username: 'A01721881',
        Day: '2024-05-01',
        StartHour: '18:00',
        EndHour: '19:00',
        SpaceName: 'Dimension Forge',
        SpaceId: 4,
        RequirementsId: '1,2,4',
        RequirementsQuantity: '1,3,6',
        GroupCode: '5ee4e77'
    },
    {
        Username: 'A01721881',
        Day: '2024-05-01',
        StartHour: '18:00',
        EndHour: '19:00',
        SpaceName: 'Social Networking',
        SpaceId: 1,
        RequirementsId: '1,2,4',
        RequirementsQuantity: '1,3,6',
        GroupCode: '5ee4e77'
    },
    {
        Username: 'A01721881',
        Day: '2024-05-01',
        StartHour: '18:00',
        EndHour: '19:00',
        SpaceName: 'Social Networking',
        SpaceId: 1,
        RequirementsId: '1,2,4',
        RequirementsQuantity: '1,3,6',
        GroupCode: '5ee4e77'
    },
]