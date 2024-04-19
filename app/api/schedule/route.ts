import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("request");
        const id = body.id;
        const response = await axios.get(`https://dlbackendtws.azurewebsites.net/reservations/schedule/${id}`, 
        {
            headers: {
                "x-api-key": "ihbnjek.fiwavfubg?njkm!rof7482?930ijef.xKP.ADEI?OU!HQE98742.Qg7984?20"
            }
        }
        );
        const data = response.data;
        return new NextResponse(JSON.stringify(data))
    }
    catch(e) {
        console.error(e);
        return new NextResponse(JSON.stringify({
            error: e
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        }
        )
    }
}


// export async function GET() {
//   //await new Promise(resolve => setTimeout(resolve, 3000));
//     return new NextResponse(JSON.stringify(
//       [
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "8:00",
//           EndHour: "9:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "9:00",
//           EndHour: "10:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "10:00",
//           EndHour: "11:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "11:00",
//           EndHour: "12:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "12:00",
//           EndHour: "13:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "13:00",
//           EndHour: "14:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "14:00",
//           EndHour: "15:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "15:00",
//           EndHour: "16:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "16:00",
//           EndHour: "17:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "17:00",
//           EndHour: "18:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "14/4/2024",
//           StartHour: "18:00",
//           EndHour: "19:00",
//           Occupied: true,
//         },
//         {SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "8:00",
//           EndHour: "9:00",
//           Occupied: true,
//         },
//         {SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "9:00",
//           EndHour: "10:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "10:00",
//           EndHour: "11:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "11:00",
//           EndHour: "12:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "12:00",
//           EndHour: "13:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "13:00",
//           EndHour: "14:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "14:00",
//           EndHour: "15:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "15:00",
//           EndHour: "16:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "16:00",
//           EndHour: "17:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "17:00",
//           EndHour: "18:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "15/4/2024",
//           StartHour: "18:00",
//           EndHour: "19:00",
//           Occupied: false,
//         },
//         {SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "8:00",
//           EndHour: "9:00",
//           Occupied: false,
//         },
//         {SpaceId: 1,
//           Day: "2024-04-156",
//           StartHour: "9:00",
//           EndHour: "10:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "10:00",
//           EndHour: "11:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "11:00",
//           EndHour: "12:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "12:00",
//           EndHour: "13:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "13:00",
//           EndHour: "14:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "14:00",
//           EndHour: "15:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "15:00",
//           EndHour: "16:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "16:00",
//           EndHour: "17:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "17:00",
//           EndHour: "18:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "16/4/2024",
//           StartHour: "18:00",
//           EndHour: "19:00",
//           Occupied: false,
//         },
    
//         {SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "8:00",
//           EndHour: "9:00",
//           Occupied: false,
//         },
//         {SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "9:00",
//           EndHour: "10:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "10:00",
//           EndHour: "11:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "11:00",
//           EndHour: "12:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "12:00",
//           EndHour: "13:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "13:00",
//           EndHour: "14:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "14:00",
//           EndHour: "15:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "15:00",
//           EndHour: "16:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "16:00",
//           EndHour: "17:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "17:00",
//           EndHour: "18:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "17/4/2024",
//           StartHour: "18:00",
//           EndHour: "19:00",
//           Occupied: false,
//         },
    
//         {SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "8:00",
//           EndHour: "9:00",
//           Occupied: false,
//         },
//         {SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "9:00",
//           EndHour: "10:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "10:00",
//           EndHour: "11:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "11:00",
//           EndHour: "12:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "12:00",
//           EndHour: "13:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "13:00",
//           EndHour: "14:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "14:00",
//           EndHour: "15:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "15:00",
//           EndHour: "16:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "16:00",
//           EndHour: "17:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "17:00",
//           EndHour: "18:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "18/4/2024",
//           StartHour: "18:00",
//           EndHour: "19:00",
//           Occupied: false,
//         },
    
//         {SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "8:00",
//           EndHour: "9:00",
//           Occupied: false,
//         },
//         {SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "9:00",
//           EndHour: "10:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "10:00",
//           EndHour: "11:00",
//           Occupied: true,
//         },
//         {
//           SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "11:00",
//           EndHour: "12:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "12:00",
//           EndHour: "13:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "13:00",
//           EndHour: "14:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "14:00",
//           EndHour: "15:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "15:00",
//           EndHour: "16:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "16:00",
//           EndHour: "17:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "17:00",
//           EndHour: "18:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 1,
//           Day: "19/4/2024",
//           StartHour: "18:00",
//           EndHour: "19:00",
//           Occupied: false,
//         },
//         {
//           SpaceId: 2,
//           Day: "15/4/2024",
//           StartHour: "8:00",
//           EndHour: "9:00",
//           Occupied: false,
//         },
        
//       ]
//     ))
// }
