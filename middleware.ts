import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Define protected and auth routes
const protectedRoutes = ["/dashboard","/playlists"];
const authRoutes = ["/", "/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname === route); // Use exact match instead of startsWith

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  // If no token and trying to access protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", baseUrl));
  }

  // If has token and trying to access auth routes
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
      await jwtVerify(token, secret);

      // Only redirect from explicit auth routes, not from all paths that start with them
      if (isAuthRoute && pathname !== "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard", baseUrl));
      }
    } catch {
      // Invalid token - clear it and redirect to login if on protected route
      if (isProtectedRoute) {
        const response = NextResponse.redirect(new URL("/", baseUrl));
        response.cookies.delete("session");
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
