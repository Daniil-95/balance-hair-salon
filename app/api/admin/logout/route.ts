import { NextResponse } from "next/server";
import { AUTH_COOKIE_OPTIONS, TOKEN_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login?loggedout=1", request.url), 303);
  response.cookies.set({
    name: TOKEN_NAME,
    value: "",
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0
  });

  return response;
}
