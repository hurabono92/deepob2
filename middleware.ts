import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public: login page itself, and read-only (GET) post/board/hero-slide/site-image/site-text access.
  if (pathname === "/admin/login") return NextResponse.next();
  if (
    (pathname.startsWith("/api/posts") ||
      pathname.startsWith("/api/hero-slides") ||
      pathname.startsWith("/api/site-images") ||
      pathname.startsWith("/api/site-texts") ||
      pathname.startsWith("/api/history-entries")) &&
    request.method === "GET"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = token ? await verifySessionToken(token) : false;

  if (authenticated) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/posts/:path*",
    "/api/upload/:path*",
    "/api/hero-slides/:path*",
    "/api/site-images/:path*",
    "/api/site-texts/:path*",
    "/api/history-entries/:path*",
    "/api/admin/account/:path*",
  ],
};
