import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["ar", "fr"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1];

  if (LOCALES.includes(segment)) {
    const headers = new Headers(request.headers);
    headers.set("x-locale", segment);
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/ar${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[\\w]+$).*)"],
};
