import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingWidgets } from "@/components/floating-widgets";
import { getCategories, getServices } from "@/lib/data";
import { t } from "@/lib/i18n";
import { getBlock, getHeaderNav, getResolvedSite } from "@/lib/cms";
import { isLocale, type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const isFr = raw === "fr";
  const info = await getResolvedSite();
  return {
    title: isFr ? info.seoTitleFr : info.seoTitleAr,
    description: isFr ? info.seoDescFr : info.seoDescAr,
    alternates: {
      languages: { ar: "/ar", fr: "/fr" },
    },
    openGraph: {
      type: "website",
      siteName: "ATLAS TECH CONCEPT",
      locale: isFr ? "fr_MA" : "ar_MA",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const tr = t(locale);

  const [services, categories, contact, footerAbout, items] = await Promise.all([
    getServices(),
    getCategories(),
    getResolvedSite(),
    getBlock("footer.about", locale),
    getHeaderNav(locale),
  ]);

  return (
    <QuoteProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-[100] focus:rounded-lg focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-white"
      >
        {tr.skipToContent}
      </a>
      <SiteHeader
        locale={locale}
        contact={contact}
        items={items}
        labels={{
          home: tr.home,
          cart: tr.cart,
          searchPlaceholder: tr.searchPlaceholder,
          location: tr.topbarLocation,
          follow: tr.topbarFollow,
          languageSwitch: tr.languageSwitch,
          menu: locale === "fr" ? "Menu" : "القائمة",
        }}
      />
      <main id="main">{children}</main>
      <SiteFooter
        locale={locale}
        services={services}
        categories={categories}
        contact={contact}
        aboutText={footerAbout}
      />
      <FloatingWidgets
        locale={locale}
        whatsapp={contact.whatsapp}
        labels={{
          whatsapp: locale === "fr" ? "WhatsApp" : "واتساب",
          cookieText: tr.cookieText,
          cookieMore: tr.cookieMore,
          cookieAccept: tr.cookieAccept,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: contact.nameFr,
            alternateName: contact.nameAr,
            description: locale === "fr" ? contact.taglineFr : contact.taglineAr,
            email: contact.email,
            telephone: contact.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Avenue Moulay Smaïl, Rés. Moulay Ismaïl N°22, 5ème étage N°19",
              addressLocality: "Tanger",
              postalCode: "90000",
              addressCountry: "MA",
            },
          }),
        }}
      />
    </QuoteProvider>
  );
}
