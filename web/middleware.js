import { NextResponse } from 'next/server'

export function middleware(request) {
  const player = request.cookies.get('pq-player')?.value
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isApi = request.nextUrl.pathname.startsWith('/api')

  if (!player && !isLoginPage && !isApi) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}
