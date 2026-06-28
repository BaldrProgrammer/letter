import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {URL_SER} from "@/constant/const";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname.startsWith(`${URL_SER}`)) {
        return NextResponse.next();
    }
    const hasAuthCookie = request.cookies.has('access_token');
    const isAuthPage = pathname.startsWith('/auth');
    if (pathname === '/') {
        if (hasAuthCookie) {
            return NextResponse.redirect(new URL('/p/chats', request.url));
        }
        return NextResponse.redirect(new URL('/auth', request.url))
    }


    if (hasAuthCookie && isAuthPage) {
        return NextResponse.redirect(new URL('/p/chats', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
