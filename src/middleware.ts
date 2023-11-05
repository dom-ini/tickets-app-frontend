import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/reset-hasla")) {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) return NextResponse.redirect(new URL("/", request.url));
  }
}
