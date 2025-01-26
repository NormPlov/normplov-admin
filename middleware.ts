import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("========| Middleware Running |========");
  console.log("=> Request URL: ", request.url);
  console.log("=> Request Method: ", request.method);

  const cookies = request.cookies;
  const accessToken = cookies.get("normplov-refresh-token"); // Assuming your access token is named 'authToken'

  // If there's no access token and the user is trying to access a protected page, redirect to login
  if (!accessToken && !request.url.includes("/login")) {
    console.log("=> No access token, redirecting to login...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If access token exists or user is trying to access the login page, allow the request to continue
  return NextResponse.next();
}

// multiple middleware
export const config = {
  matcher: ["/"], 
//   compiler: {
//     removeConsole: true,
// }
};
