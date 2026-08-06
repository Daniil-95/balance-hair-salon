import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-in-production";
const TOKEN_NAME = "balance_token";

export function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as Record<string, unknown>;
}

export function getAuthToken() {
  const token = cookies().get(TOKEN_NAME)?.value;
  return token ?? null;
}
