import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getJwtSecret() {
  const jwtSecretFromEnv = process.env.JWT_SECRET;

  if (!jwtSecretFromEnv && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be set in production.");
  }

  return jwtSecretFromEnv ?? "change-me-in-development";
}

export const TOKEN_NAME = "balance_token";

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
};

export function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as Record<string, unknown>;
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
    redirect("/admin/login?unauthorized=1");
  }

  return payload;
}
