import { type NextRequest, NextResponse } from 'next/server';
import { decode, type JwtPayload } from 'jsonwebtoken';

import { COOKIE_NAME } from '@/constants/cookies';

export const config = {
  matcher: ['/', '/shoplist/:path*']
};

export default async function middleware(request: NextRequest) {
  const signInUrl = new URL('/', request.url);
  const shoplistUrl = new URL('/shoplist', request.url);

  const token = request.cookies.get(COOKIE_NAME);

  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }
    return NextResponse.redirect(signInUrl);
  }

  const decodedToken = decode(token.value) as JwtPayload;

  // Now in milisseconds
  const now = Math.floor(Date.now() / 1000);

  if (decodedToken.exp && decodedToken.exp < now) {
    // implementar algum toast sepa.
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }

    const response = NextResponse.redirect(signInUrl);

    response.cookies.set({
      name: COOKIE_NAME,
      value: '',
      maxAge: 0,
      path: '/'
    });

    return response;
  }

  console.log(decodedToken);

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(shoplistUrl);
  }
}
