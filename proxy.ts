import { NextRequest, NextResponse } from 'next/server';
import { authProxy } from './proxies/authProxy';

const proxies = [authProxy];

export function proxy(request: NextRequest) {
    for (const fn of proxies) {
        const res = fn(request);

        console.log('it is processing...');

        if (res) return res;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};
