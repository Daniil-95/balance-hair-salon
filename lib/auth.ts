import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-in-production";
export const TOKEN_NAME = "balance_token";

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
};

export function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as Record<string, unknown>;
}

export function isAdminPayload(payload: Record<string, unknown> | null | undefined) {
  return payload?.role === "ADMIN";
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  return token ?? null;
}

export async function getSessionPayload() {
  const token = await getAuthToken();
  if (!token) {
    return null;
  }

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const payload = await getSessionPayload();
  if (!isAdminPayload(payload)) {
    throw new Error("Unauthorized");
  }

  return payload;
}
