import { NextResponse, type NextRequest } from 'next/server';
import { parse, serialize } from 'cookie';
import { type JwtPayload, decode } from 'jsonwebtoken';

import { COOKIE_NAME, MAX_AGE } from '@/constants/cookies';

export async function GET(request: NextRequest): Promise<Response> {
  const headers = request.headers?.get('cookie');

  if (!headers) {
    return new NextResponse(JSON.stringify({}), {
      status: 200
    });
  }

  const cookies = parse(request.headers?.get('cookie') as string);

  const cookieObject = {
    token: cookies.token,
    userData: JSON.parse(cookies.userData)
  };

  return new NextResponse(JSON.stringify(cookieObject), {
    status: 200
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();

  const { token } = body;

  const decodedToken = decode(token) as Partial<JwtPayload>;

  const userData = {
    userId: decodedToken.unique_name,
    email: decodedToken.email,
    username: decodedToken.given_name
  };

  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/'
  });

  const serializedUser = serialize('userData', JSON.stringify(userData), {
    httpOnly: false,
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/'
  });

  const response = new NextResponse('Token set with success!', { status: 200 });

  response.headers.append('Set-Cookie', serialized);
  response.headers.append('Set-Cookie', serializedUser);

  return response;
}

export async function DELETE(request: Request): Promise<Response> {
  const response = new NextResponse('Token deleted.');

  response.cookies.set({
    name: COOKIE_NAME,
    value: '',
    maxAge: 0,
    path: '/'
  });

  response.cookies.set({
    name: 'userData',
    value: '',
    maxAge: 0,
    path: '/'
  });

  return response;
}
