import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

const PUBLIC_FILE = /\.(?:png|jpe?g|gif|svg|webp|avif|ico|css|js|map|txt|xml|woff2?|ttf|otf|json|mp4|webm)$/i;

/**
 * Every page lives under `/{locale}/...`.
 *
 *  - `/`            → `/ar`                       (307, Accept-Language aware)
 *  - `/services`    → `/ar/services`              (307, locale inferred)
 *  - `/plomberie-reseaux-eau` → `/ar/services/plomberie`  (301, historic slug)
 *  - `/fr/...`      → left untouched
 *  - `/fr/accueil`  → `/fr`                       (301, historic home slug)
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Never touch assets, API routes or Next internals.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  // Already localized → only the slug may need a permanent redirect.
  if (first && (locales as readonly string[]).includes(first)) {
    const rest = '/' + segments.slice(1).join('/');
    const redirected = legacyRedirect(rest);
    if (redirected !== null) {
      const url = request.nextUrl.clone();
      url.pathname = `/${first}${redirected}`;
      url.search = search;
      return NextResponse.redirect(url, 301);
    }
    return NextResponse.next();
  }

  // Not localized → pick a locale, then redirect.
  const locale = preferredLocale(request);
  const legacy = legacyRedirect(pathname);
  const url = request.nextUrl.clone();
  url.pathname = legacy !== null ? `/${locale}${legacy}` : `/${locale}${pathname === '/' ? '' : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, legacy !== null ? 301 : 307);
}

/**
 * Historic URLs of the previous site, kept alive for SEO.
 * Both the French slug scheme and the Arabic one are covered;
 * `''` means "the locale root".
 */
const LEGACY: Record<string, string> = {
  // ---- French slugs used by the historic site -------------------------
  '/accueil': '',
  '/a-propos-de-nous': '/a-propos',
  '/services-fr': '/services',
  '/produits-fr': '/produits',
  '/design-decoration': '/design',
  '/contactez-nous': '/contact',
  '/electricite': '/services/electricite',
  '/plomberie-reseaux-eau': '/services/plomberie',
  '/chauffage-central': '/services/chauffage-central',
  '/climatisation-ventilation': '/services/climatisation',
  '/energie-solaire': '/services/energie-solaire',
  '/amenagement-interieur-finition': '/services/amenagement-interieur',
  '/equipements-electriques': '/produits/equipements-electriques',
  '/equipements-plomberie': '/produits/equipements-plomberie',
  '/appareils-climatisation': '/produits/appareils-climatisation',
  '/systemes-energie-solaire': '/produits/systemes-energie-solaire',
  '/appareils-electromenagers': '/produits/appareils-electromenagers',

  // ---- Arabic slugs used by the historic site -------------------------
  '/من-نحن': '/a-propos',
  '/اتصل-بنا': '/contact',
  '/الخدمات': '/services',
  '/المنتجات': '/produits',
  '/المدونة': '/blog',
  '/التصميم-والتزيين': '/design',
  '/الكهرباء': '/services/electricite',
  '/السباكة-والمياه': '/services/plomberie',
  '/التدفئة-المركزية': '/services/chauffage-central',
  '/التكييف-والتهوية': '/services/climatisation',
  '/الطاقة-الشمسية': '/services/energie-solaire',
  '/التجهيز-الداخلي-والتشطيب': '/services/amenagement-interieur',
};

function legacyRedirect(path: string): string | null {
  const clean = path.replace(/\/+$/, '') || '/';
  let decoded = clean;
  try {
    decoded = decodeURIComponent(clean);
  } catch {
    /* malformed escape sequence — fall back to the raw path */
  }
  if (clean in LEGACY) return LEGACY[clean];
  if (decoded in LEGACY) return LEGACY[decoded];
  return null;
}

function preferredLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language') ?? '';
  if (/^\s*fr\b/i.test(header) || /[,;]\s*fr\b/i.test(header)) return 'fr';
  return defaultLocale;
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico).*)'],
};
