import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("authentication-token");

  // If the user has an auth token and is accessing the root page
  if (authCookie && request.nextUrl.pathname === "/") {
    try {
      // Decode the JWT payload (the second part of the token)
      const payloadBase64Url = authCookie.value.split(".")[1];
      if (payloadBase64Url) {
        const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        // Redirect based on role
        if (payload.role === "admin") {
          return NextResponse.redirect(new URL("/admin", request.url));
        } else {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } catch (error) {
      // If decoding fails, just continue
      console.error("Failed to decode token in middleware:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
