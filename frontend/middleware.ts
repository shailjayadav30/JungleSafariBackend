import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware executed", request.nextUrl.pathname);

  const authToken = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const publicPaths = ["/", "/contact", "/safaris", "/login", "/register","/about","/api/auth/register", "/api/auth/login"];

  const loggedInUserCannotAccessPaths =
    path === "/login" || path === "/register";

  if (loggedInUserCannotAccessPaths && authToken) {
    console.log("Redirecting logged in user from", path, "to /");
    return NextResponse.redirect(new URL("/", request.url));
  }
  const isProtectedPath = !publicPaths.includes(path);

  if (!authToken && isProtectedPath) {
    console.log("Unauthenticated access attempt to:", path);

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]

};
