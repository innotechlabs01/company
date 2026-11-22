import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "es";

function detectLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return defaultLocale;
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase())
    .filter((lng) => lng);
  for (const lng of preferred) {
    const base = lng.split("-")[0] as Locale;
    if (locales.includes(base as Locale)) return base as Locale;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static assets and internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (!hasLocale) {
    const acceptLanguage = request.headers.get("accept-language") ?? undefined;
    const detected = detectLocale(acceptLanguage);
    const url = request.nextUrl.clone();
    url.pathname = `/${detected}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
