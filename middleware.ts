import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protege rotas de administrador e API de administrador (exceto login)
  if ((pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) && 
      !pathname.startsWith('/admin/login') && 
      !pathname.startsWith('/api/admin/login')) {
    const token = request.cookies.get('admin_token');

    if (!token) {
      // Se for uma rota de página, redireciona. Se for API, retorna 401.
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
