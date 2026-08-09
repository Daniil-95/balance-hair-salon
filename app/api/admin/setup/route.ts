import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { AUTH_COOKIE_OPTIONS, TOKEN_NAME, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, setupKey } = body as { email?: string; password?: string; setupKey?: string };

  if (!email || !password || !setupKey) {
    return NextResponse.json({ message: "Vyplňte e-mail, heslo a setup klíč." }, { status: 400 });
  }

  const expectedSetupKey = process.env.ADMIN_SETUP_KEY;
  if (!expectedSetupKey || setupKey !== expectedSetupKey) {
    return NextResponse.json({ message: "Neplatný setup klíč." }, { status: 403 });
  }

  const existingAdmin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (existingAdmin) {
    return NextResponse.json({ message: "Admin účet už existuje. Přihlaste se standardně." }, { status: 409 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: "Uživatel s tímto e-mailem už existuje." }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const token = signToken({ userId: user.id, role: user.role, email: user.email });
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: TOKEN_NAME,
    value: token,
    ...AUTH_COOKIE_OPTIONS,
  });

  return response;
}
