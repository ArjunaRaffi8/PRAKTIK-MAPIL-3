import "server-only";

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const COOKIE_NAME = "admin_session";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET belum diatur di .env");
}

const JWT_SECRET = new TextEncoder().encode(secret);

export type AdminSession = {
  id: number;
  email: string;
  nama: string;
};

export async function createSession(session: AdminSession) {
  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function getSessionFromCookies(): Promise<AdminSession | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (
      typeof payload.id !== "number" ||
      typeof payload.email !== "string" ||
      typeof payload.nama !== "string"
    ) {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email,
      nama: payload.nama,
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}