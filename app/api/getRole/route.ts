import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from 'jose'


export async function GET(req: NextRequest) {
    const session = req.cookies.get("session")?.value;

    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url))
      } 
    
      try {
        const data = await jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET));
        return new NextResponse(JSON.stringify({data}), {
            status: 200,
        });
      } catch (e) {
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.set('session', '', {
          maxAge: 0,
          path: '/',
        });
        return response;
      }
}