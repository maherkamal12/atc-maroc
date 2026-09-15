import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';

import '@fontsource-variable/cairo';
import '@fontsource-variable/inter';
import '../globals.css';

import { isLocale, locales, localeConfig, type Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { FloatingActions } from '@/components/layout/FloatingActions';

export const viewport: Viewport = {
  themeColor: '#071a31',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const path = `/${locale}`;
  return {
    metadataBase: new URL('https://atc-maroc.com'),
    title: {
      default: t(ui.seo.defaultTitle, locale),
      template: `%s | ${site.latinName}`,
    },
    description: t(ui.seo.defaultDescription, locale),
    applicationName: site.latinName,
    keywords: [
      'ATC Maroc',
      'Atlas Tech Concept',
      'électricité Tanger',
      'plomberie Tanger',
      'climatisation Tanger',
      'chauffage central Maroc',
      'énergie solaire Tanger',
      'aménagement intérieur Maroc',
      'كهرباء طنجة',
      'سباكة طنجة',
      'تكييف المغرب',
      'طاقة شمسية طنجة',
    ],
    alternates: {
      canonical: path,
      languages: {
        ar: '/ar',
        fr: '/fr',
        'x-default': '/ar',
      },
    },
    openGraph: {
      type: 'website',
      siteName: site.latinName,
      title: t(ui.seo.defaultTitle, locale),
      description: t(ui.seo.defaultDescription, locale),
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      url: path,
      images: [{ url: '/images/hero/main.jpg', width: 1200, height: 630, alt: site.latinName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(ui.seo.defaultTitle, locale),
      description: t(ui.seo.defaultDescription, locale),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const cfg = localeConfig[typedLocale];

  // Organization + local business structured data (bilingual).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: site.latinName,
    alternateName: t(ui.brandName, typedLocale),
    image: 'https://atc-maroc.com/images/hero/main.jpg',
    url: `https://atc-maroc.com/${typedLocale}`,
    telephone: site.phone,
    email: site.email,
    priceRange: 'MAD',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenue Moulay Ismaïl, Rés. Moulay Ismaïl N°22, Étage 5 N°19',
      addressLocality: 'Tanger',
      postalCode: '90000',
      addressCountry: 'MA',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 35.7673, longitude: -5.7998 },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '18:00',
      },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:00', closes: '17:00' },
    ],
    areaServed: site.zones.map((z) => ({ '@type': 'City', name: z })),
    sameAs: [site.instagram],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '900' },
  };

  return (
    <html lang={cfg.htmlLang} dir={cfg.dir} suppressHydrationWarning>
      <body className="min-h-screen bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-950 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          {t(ui.common.skipToContent, typedLocale)}
        </a>

        <Header locale={typedLocale} />
        <main id="main">{children}</main>
        <Footer locale={typedLocale} />

        <FloatingActions locale={typedLocale} />
        <CookieBanner locale={typedLocale} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
