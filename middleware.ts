import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rewrite common favicon requests to the project's CODEFUSION.png
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const faviconPaths = [
    '/favicon.ico',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
  ];

  if (faviconPaths.includes(pathname)) {
    // rewrite to the existing CODEFUSION.png in /public
    const url = req.nextUrl.clone();
    url.pathname = '/CODEFUSION.png';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/favicon.ico',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
  ],
};
