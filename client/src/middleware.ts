import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const hasAuthCookie = request.cookies.has('access_token');
    const isAuthPage = pathname.startsWith('/auth');
    if (pathname === '/') {
        if (hasAuthCookie) {
            return NextResponse.redirect(new URL('/p/chats', request.url));
        }
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    if (!hasAuthCookie && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }
    if (hasAuthCookie && isAuthPage) {
        return NextResponse.redirect(new URL('/p/chats', request.url)); // Замените '/dashboard' на ваш приватный роут (например, '/profile')
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
