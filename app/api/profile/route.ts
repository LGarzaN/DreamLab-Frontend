import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const cookieHeader = req.headers.get('cookie');
    
    const sessionToken = extractSessionToken(cookieHeader);

    if (!sessionToken) {
        return NextResponse.json({
            error: 'Session token not found'
        }, {
            status: 401
        });
    }

    try {
        const payload = sessionToken.split('.')[1];
        const decodedPayload = atob(payload);
        const userData = JSON.parse(decodedPayload);

        return NextResponse.json({
            usuario: userData
        });
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return NextResponse.json({
            error: 'Invalid session token'
        }, {
            status: 401
        });
    }
}

function extractSessionToken(cookieHeader: string | null): string | null {
    if (!cookieHeader) {
        return null;
    }

    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'session') {
            return value;
        }
    }

    return null;
}
