import { type NextRequest, NextResponse } from 'next/server';
import { jwtDecrypt } from 'jose';

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

  const decodedToken = await jwtDecrypt(token.value, {
    type: 'string'
  });

  // Now in milisseconds
  const now = Math.floor(Date.now() / 1000);

  if (decodedToken.payload?.exp && decodedToken.payload?.exp < now) {
    const response = NextResponse.redirect(signInUrl);

    if (request.nextUrl.pathname === '/') {
      response.cookies.set({
        name: COOKIE_NAME,
        value: '',
        maxAge: 0,
        path: '/'
      });
      return response;
    }

    response.cookies.set({
      name: COOKIE_NAME,
      value: '',
      maxAge: 0,
      path: '/'
    });

    return response;
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(shoplistUrl);
  }
}
