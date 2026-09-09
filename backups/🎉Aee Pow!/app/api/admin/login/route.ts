import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import path from "path";
import fs from "fs";

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET || "fallback-secret-minimo-32-caracteres-!!"
);

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const expectedUser = process.env.ADMIN_USER || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "admin";

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const token = await new SignJWT({ sub: username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(ADMIN_SECRET);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return res;
}
