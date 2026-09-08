import { NextRequest, NextResponse } from "next/server";
import { extractSubdomain } from "@/lib/domain";

/**
 * Subdomain routing proxy (formerly "middleware" — Next.js 16 renamed this
 * file convention from middleware.ts/middleware() to proxy.ts/proxy()).
 *
 * Detects an artist subdomain from the request Host header (e.g.
 * "mhr.localhost:3000" or, in production, "mhr.crwu.com") and internally
 * rewrites the request to the shared artist microsite template at
 * /sites/[subdomain]. The browser URL bar is never changed — this is a
 * rewrite, not a redirect.
 *
 * IMPORTANT: this file intentionally does NOT touch MongoDB. It only
 * parses the hostname and decides where to route the request. The actual
 * artist lookup happens later, in the Node.js server-rendering layer
 * (src/app/sites/[subdomain]/page.tsx), to avoid running a database
 * connection inside the Edge runtime.
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  const subdomain = extractSubdomain(host);

  // Main site (crwu.com / www.crwu.com / localhost) — no rewrite needed.
  if (!subdomain) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/sites/${subdomain}`;

  return NextResponse.rewrite(url);
}

export const config = {
  // Run on every request EXCEPT:
  //  - Next.js internals (_next/static, _next/image)
  //  - favicon.ico
  //  - API routes (must reach the real route handler unmodified)
  //  - the internal /sites/* template itself (avoid double-handling)
  //  - any request path that looks like a static file (contains a dot,
  //    e.g. .png, .css, .js, .webp, .otf, .ico, etc.)
  matcher: ["/((?!api|_next/static|_next/image|favicon\\.ico|sites/|.*\\..*).*)"],
};
