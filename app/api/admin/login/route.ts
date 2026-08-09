import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { AUTH_COOKIE_OPTIONS, TOKEN_NAME, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body as { email: string; password: string };

  if (!email || !password) {
    return NextResponse.json({ message: "Vyplňte e-mail a heslo." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: "Neplatné přihlašovací údaje." }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: "Neplatné přihlašovací údaje." }, { status: 401 });
  }

  if (user.role !== "ADMIN") {
    return NextResponse.json({ message: "Přístup byl zamítnut." }, { status: 403 });
  }

  const token = signToken({ userId: user.id, role: user.role, email: user.email });

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: TOKEN_NAME,
    value: token,
    ...AUTH_COOKIE_OPTIONS,
  });

  return response;
}
