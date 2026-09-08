import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";

function getSecretKey() {
  return new TextEncoder().encode(process.env.AUTH_SECRET);
}

// Middleware ini HANYA melindungi halaman /admin/dashboard/*.
// Proteksi API (POST/PUT/DELETE) tetap dilakukan juga di masing-masing
// route.ts menggunakan requireAdmin(), sebagai lapisan kedua.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPage = pathname.startsWith("/admin/dashboard");

  if (!isProtectedPage) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, getSecretKey());
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/admin/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
