import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { isLocale, localeHref, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import {
  getProductCategory,
  productCategories,
  productsByCategory,
} from '@/content/products';
import { PageHero } from '@/components/ui/PageHero';
import { ProductCard } from '@/components/cards/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/home/CtaBand';

export function generateStaticParams() {
  return productCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getProductCategory(category);
  if (!isLocale(locale) || !cat) return {};
  return {
    title: t(cat.title, locale),
    description: t(cat.short, locale),
    alternates: {
      canonical: `/${locale}/produits/${category}`,
      languages: {
        ar: `/ar/produits/${category}`,
        fr: `/fr/produits/${category}`,
        'x-default': `/ar/produits/${category}`,
      },
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isLocale(locale)) notFound();
  const cat = getProductCategory(category);
  if (!cat) notFound();

  const typed = locale as Locale;
  const items = productsByCategory(cat.slug);

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(ui.products.eyebrow, typed)}
        title={t(cat.title, typed)}
        subtitle={t(cat.short, typed)}
        crumbs={[
          { label: t(ui.nav.products, typed), href: localeHref(typed, 'produits') },
          { label: t(cat.title, typed) },
        ]}
      >
        <div className="flex flex-wrap gap-2.5">
          {productCategories
            .filter((c) => c.slug !== cat.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={localeHref(typed, `produits/${c.slug}`)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-[.78rem] font-bold text-white/75 backdrop-blur transition hover:border-accent-400/60 hover:text-white"
              >
                <Icon name={c.icon} className="h-3.5 w-3.5 text-accent-400" />
                {t(c.title, typed)}
              </Link>
            ))}
        </div>
      </PageHero>

      {/* ------------------------------------------------------ intro + highlights */}
      <section className="bg-white pt-14">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[1rem] leading-[1.95] text-ink-700">{t(cat.intro, typed)}</p>
            </div>
            <div className="lg:col-span-5">
              <ul className="grid gap-3 sm:grid-cols-2">
                {cat.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-4 text-[.82rem] font-semibold leading-snug text-brand-950"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                      strokeWidth={3}
                    />
                    {t(h, typed)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- products */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.35rem] font-extrabold text-brand-950">
              {t(cat.title, typed)}
            </h2>
            <p className="text-[.82rem] font-semibold text-ink-500">
              {items.length} {t(ui.products.resultsCount, typed)}
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product, i) => (
              <Reveal key={product.slug} delay={i * 55} className="h-full">
                <ProductCard product={product} locale={typed} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href={localeHref(typed, 'produits')} className="btn-outline !px-8 !py-3.5">
              {t(ui.common.backToProducts, typed)}
              <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand locale={typed} />
    </>
  );
}
