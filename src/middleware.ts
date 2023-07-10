import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-url', request.nextUrl.href);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
