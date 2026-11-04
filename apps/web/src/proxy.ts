import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export function proxy(request: NextRequest) {
    const token=getToken({
        req:request,
        secret:process.env.AUTH_SECRET
    })
    if(!token){
        const loginUrl=new URL("/login",request.url)
        loginUrl.searchParams.set("callbackUrl",request.nextUrl.pathname+request.nextUrl.search)
        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

//Security note: This is only a route-level session gate. Later, sensitive Server Actions and database operations must independently verify authentication and roles.