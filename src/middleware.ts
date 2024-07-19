import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

// Create a Ratelimit instance
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(100, '15 m'), // Allow 100 requests per 15 minutes
});

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const identifier = request.ip ?? '127.0.01'; // Use IP as identifier or a fallback

  const result = await ratelimit.limit(identifier);

  // Add headers for rate limiting details (optional but recommended)
  const responseHeaders = new Headers(NextResponse.next().headers);
  responseHeaders.set('X-RateLimit-Limit', result.limit.toString());
  responseHeaders.set('X-RateLimit-Remaining', result.remaining.toString());
  responseHeaders.set('X-RateLimit-Reset', result.reset.toString());

  if (!result.success) {
    return new NextResponse('Too many requests', {
      status: 429,
      headers: responseHeaders,
    });
  }

  return NextResponse.next({ headers: responseHeaders });
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

