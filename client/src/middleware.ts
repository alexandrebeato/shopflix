import { type NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/constants/cookies';

export const config = {
  matcher: ['/', '/shoplist/:path*']
};

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME);

  const signInUrl = new URL('/', request.url);
  const shoplistUrl = new URL('/shoplist', request.url);

  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }
    return NextResponse.redirect(signInUrl);
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(shoplistUrl);
  }
}
