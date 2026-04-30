import 'dotenv';
import { NextRequest, NextResponse } from 'next/server';

const authToken = process.env.BETTER_AUTH_TOKEN || '';

export function authProxy(request: NextRequest) {
    const token = request.cookies.get(authToken)?.value;
    const { pathname } = request.nextUrl;

    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}
