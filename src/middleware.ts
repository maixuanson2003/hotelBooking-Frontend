"use server";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   let cookie = request.cookies.get("nextjs");
//   console.log(cookie);
//   console.log("call here");

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/api/city/:path*",
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Thực hiện kiểm tra hoặc thao tác cần thiết ở đây
  const token = request.cookies.get("token");
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/AuthFO/signIn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [],
};
