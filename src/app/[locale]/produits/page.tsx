import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Truck, ShieldCheck, Wrench } from 'lucide-react';
import { isLocale, localeHref, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { productCategories } from '@/content/products';
import { PageHero } from '@/components/ui/PageHero';
import { ProductBrowser } from '@/components/products/ProductBrowser';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/home/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(ui.nav.products, locale),
    description: t(ui.products.subtitle, locale),
    alternates: {
      canonical: `/${locale}/produits`,
      languages: { ar: '/ar/produits', fr: '/fr/produits', 'x-default': '/ar/produits' },
    },
  };
}

const perks = [
  {
    icon: Truck,
    title: { ar: 'توصيل سريع', fr: 'Livraison rapide' },
    body: {
      ar: 'توصيل مجاني داخل طنجة، وتوصيل لباقي المدن حسب الكمية والمسافة.',
      fr: 'Livraison offerte à Tanger, et vers les autres villes selon quantité et distance.',
    },
  },
  {
    icon: Wrench,
    title: { ar: 'تركيب احترافي', fr: 'Installation professionnelle' },
    body: {
      ar: 'فريق تركيب مختص لكل نوع من المعدات، مع التشغيل والاختبار.',
      fr: 'Une équipe dédiée par type de matériel, avec mise en service et essais.',
    },
  },
  {
    icon: ShieldCheck,
    title: { ar: 'ضمان رسمي', fr: 'Garantie officielle' },
    body: {
      ar: 'ضمان المصنّع على كل منتج، وضمان على التركيب، ودعم تقني بعد البيع.',
      fr: 'Garantie constructeur sur chaque produit, garantie sur la pose et SAV technique.',
    },
  },
];

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(ui.products.eyebrow, typed)}
        title={t(ui.products.title, typed)}
        subtitle={t(ui.products.subtitle, typed)}
        crumbs={[{ label: t(ui.nav.products, typed) }]}
      >
        <div className="flex flex-wrap gap-2.5">
          {productCategories.map((c) => (
            <Link
              key={c.slug}
              href={localeHref(typed, `produits/${c.slug}`)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-[.78rem] font-bold text-white/80 backdrop-blur transition hover:border-accent-400/60 hover:text-white"
            >
              <Icon name={c.icon} className="h-3.5 w-3.5 text-accent-400" />
              {t(c.title, typed)}
            </Link>
          ))}
        </div>
      </PageHero>

      {/* ----------------------------------------------------------- categories */}
      <section className="bg-white pt-14">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {productCategories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60} className="h-full">
                <Link
                  href={localeHref(typed, `produits/${c.slug}`)}
                  className="card card-hover flex h-full flex-col items-start p-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 text-[.95rem] font-extrabold text-brand-950">
                    {t(c.title, typed)}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[.8rem] leading-[1.75] text-ink-500">
                    {t(c.short, typed)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[.78rem] font-extrabold text-accent-700">
                    {t(ui.common.discover, typed)}
                    <ArrowRight className="rtl-flip h-3.5 w-3.5" strokeWidth={2.8} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- browser */}
      <section className="section bg-white">
        <div className="container">
          <ProductBrowser locale={typed} />
        </div>
      </section>

      {/* ----------------------------------------------------------------- perks */}
      <section className="bg-slate-50/70 py-14">
        <div className="container grid gap-6 md:grid-cols-3">
          {perks.map((perk, i) => {
            const IconCmp = perk.icon;
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-accent-600 shadow-soft ring-1 ring-slate-200">
                    <IconCmp className="h-5.5 w-5.5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-[.95rem] font-extrabold text-brand-950">
                      {t(perk.title, typed)}
                    </h3>
                    <p className="mt-2 text-[.84rem] leading-[1.8] text-ink-500">
                      {t(perk.body, typed)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaBand locale={typed} />
    </>
  );
}
