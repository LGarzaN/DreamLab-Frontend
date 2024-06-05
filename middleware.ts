import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Middleware function to validate JWT stored in the "session" cookie
export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  } else {
    try {
      await jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.next()
    } catch (e) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('session', '', {
        maxAge: 0,
        path: '/',
      });
      return response;
    }
    
  }
}

export const config = {
  matcher: ['/', '/chatbot', '/reservations', '/view-reservations', '/profile', '/admin-profile', '/admin-view-reservations', '/profile', ],
}
