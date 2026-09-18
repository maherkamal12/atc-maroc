import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteProvider } from "@/components/cart-provider";
import { SiteHeader, type HeaderNavItem } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingWidgets } from "@/components/floating-widgets";
import { getCategories, getServices } from "@/lib/data";
import { t } from "@/lib/i18n";
import { isLocale, navLinks, site, type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const isFr = raw === "fr";
  return {
    title: isFr
      ? "ATLAS TECH CONCEPT | Solutions techniques intégrées pour le bâtiment"
      : "أطلس تك كونسيبت | حلول تقنية متكاملة للمباني",
    description: isFr
      ? "Électricité, plomberie, chauffage central, climatisation, énergie solaire, aménagement intérieur et design à Tanger et partout au Maroc."
      : "كهرباء، سباكة، تدفئة مركزية، تكييف وتهوية، طاقة شمسية، تجهيز داخلي وتصميم في طنجة وكل المغرب.",
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

  const [services, categories] = await Promise.all([getServices(), getCategories()]);

  const items: HeaderNavItem[] = navLinks.map((link) => ({
    href: link.href,
    label: locale === "fr" ? link.labelFr : link.labelAr,
    children: link.children?.map((child) => ({
      href: child.href,
      label: locale === "fr" ? child.labelFr : child.labelAr,
    })),
  }));

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
      <SiteFooter locale={locale} services={services} categories={categories} />
      <FloatingWidgets
        locale={locale}
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
            name: site.nameFr,
            alternateName: site.nameAr,
            description: locale === "fr" ? site.taglineFr : site.taglineAr,
            email: site.email,
            telephone: site.phone,
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
