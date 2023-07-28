import { type NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

import { COOKIE_NAME, MAX_AGE } from '@/constants/cookies';

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();

  const { token } = body;

  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/'
  });

  return NextResponse.json('Cookie set with success.', {
    status: 200,
    headers: { 'Set-Cookie': serialized }
  });
}

export async function DELETE(request: Request): Promise<Response> {
  const response = new NextResponse('Token deleted.');

  response.cookies.set({
    name: COOKIE_NAME,
    value: '',
    maxAge: 0,
    path: '/'
  });

  return response;
}
