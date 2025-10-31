import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminFeedbackPage = request.nextUrl.pathname === '/admin/feedback';
  const isAuthenticated = request.cookies.get('adminAuth')?.value === 'true';

  if (isAdminFeedbackPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin-login/feedback', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/feedback',
};