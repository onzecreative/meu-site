import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET || "fallback-secret-minimo-32-caracteres-!!"
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define as rotas que devem ser ignoradas (login e arquivos públicos/estáticos se necessário no matcher)
  const isLoginRoute = pathname.startsWith("/admin/login") || pathname.startsWith("/api/admin/login");
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isAdminRoute || isLoginRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, ADMIN_SECRET);
    return NextResponse.next();
  } catch {
    const response = pathname.startsWith("/api/") 
      ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(new URL("/admin/login", request.url));
    
    response.cookies.delete("admin_token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
