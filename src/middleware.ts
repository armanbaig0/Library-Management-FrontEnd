import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  const { pathname } = request.nextUrl;

  // Protect Student dashboard
  if (pathname.startsWith('/Student')) {
    if (!token || role !== 'Student') {
      return NextResponse.redirect(new URL('/Login', request.url));
    }
  }

  // Protect Admin dashboard
  if (pathname.startsWith('/Admin')) {
    if (!token || role !== 'Admin') {
      return NextResponse.redirect(new URL('/Login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/Student/:path*', '/Admin/:path*'],  // Apply middleware only on these routes
};
