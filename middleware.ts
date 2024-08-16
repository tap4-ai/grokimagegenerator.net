import { NextResponse, type NextRequest } from 'next/server';

import { AUTHORIZATION, HEADER_IP_KEY } from './lib/constants';
import intlMiddleware from './middlewares/intlMiddleware';

function getIp(request: NextRequest): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.ip ||
    ''
  );
}

export default function middleware(request: NextRequest) {
  const ip = getIp(request);
  request.headers.set(HEADER_IP_KEY, ip);

  const userToken = request.cookies.get(AUTHORIZATION)?.value;

  if (!userToken && request.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname === '/profile') {
    return NextResponse.redirect(new URL('/profile/user-info', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
