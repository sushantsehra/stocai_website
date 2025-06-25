import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  // Handle trailing slashes - redirect to non-trailing slash version
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url);
  }
  
  // Handle URLs with UTM parameters for analytics - don't redirect but ensure they're not indexed separately
  if (url.search.includes('utm_')) {
    const response = NextResponse.next();
    // Add x-robots-tag header to prevent indexing of URLs with UTM parameters
    response.headers.set('x-robots-tag', 'noindex, follow');
    return response;
  }
  
  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    // Match all paths except for:
    // - api routes
    // - static files (images, js, css, etc.)
    // - favicon.ico
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)',
  ],
}; 