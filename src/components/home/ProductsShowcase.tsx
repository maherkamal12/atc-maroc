import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { products, productCategories } from '@/content/products';
import { ProductCard, ProductCtaCard } from '@/components/cards/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';

/** Featured = newest + best sellers first, capped for the home page. */
const featuredSlugs = [
  'split-inverter-12000-btu',
  'panneau-mono-550w',
  'pompe-surpression-1cv',
  'tableau-distribution-24-modules',
  'chauffe-eau-100l',
  'onduleur-hybride-5kw',
  'refrigerateur-no-frost-450l',
  'spot-led-encastrable',
];

export function ProductsShowcase({ locale }: { locale: Locale }) {
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 7);

  return (
    <section className="section bg-white">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow={t(ui.products.eyebrow, locale)}
            title={t(ui.products.title, locale)}
            subtitle={t(ui.products.subtitle, locale)}
          />
        </Reveal>

        {/* category quick links */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {productCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={localeHref(locale, `produits/${cat.slug}`)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[.82rem] font-bold text-ink-700 transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-950"
              >
                <Icon name={cat.icon} className="h-4 w-4 text-accent-600" />
                {t(cat.title, locale)}
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 6).map((product, i) => (
            <Reveal key={product.slug} delay={i * 60} className="h-full">
              <ProductCard product={product} locale={locale} />
            </Reveal>
          ))}

          <Reveal delay={420} className="h-full">
            <ProductCtaCard locale={locale} />
          </Reveal>

          {featured[6] && (
            <Reveal delay={480} className="h-full">
              <ProductCard product={featured[6]} locale={locale} />
            </Reveal>
          )}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Link href={localeHref(locale, 'produits')} className="btn-dark !px-8 !py-3.5">
              {t(ui.common.seeAllProducts, locale)}
              <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
