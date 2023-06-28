import { NextRequest, NextResponse } from "next/server";

import { isAuthenticated } from "@/lib/auth";

export const middleware = async (request: NextRequest) => {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
