import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Check,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import { isLocale, localeHref, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import {
  availabilityOf,
  getProduct,
  getProductCategory,
  products,
  productsByCategory,
} from '@/content/products';
import { PageHero } from '@/components/ui/PageHero';
import { ProductCard, formatPrice } from '@/components/cards/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/home/CtaBand';

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; product: string }>;
}): Promise<Metadata> {
  const { locale, category, product } = await params;
  const item = getProduct(product);
  if (!isLocale(locale) || !item) return {};
  return {
    title: t(item.name, locale),
    description: t(item.short, locale),
    alternates: {
      canonical: `/${locale}/produits/${category}/${product}`,
      languages: {
        ar: `/ar/produits/${category}/${product}`,
        fr: `/fr/produits/${category}/${product}`,
        'x-default': `/ar/produits/${category}/${product}`,
      },
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; product: string }>;
}) {
  const { locale, category, product } = await params;
  if (!isLocale(locale)) notFound();
  const item = getProduct(product);
  const cat = getProductCategory(category);
  if (!item || !cat || item.category !== category) notFound();

  const typed = locale as Locale;
  const related = productsByCategory(cat.slug)
    .filter((p) => p.slug !== item.slug)
    .slice(0, 3);

  const waText = encodeURIComponent(
    `${t(ui.common.whatsappMessage, typed)} — ${t(item.name, typed)} (${site.latinName})`,
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t(item.name, typed),
    description: t(item.short, typed),
    brand: { '@type': 'Brand', name: item.brand },
    category: t(cat.title, typed),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(item.rating),
      reviewCount: '24',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MAD',
      ...(item.price !== null ? { price: String(item.price) } : {}),
      availability: item.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: { '@type': 'Organization', name: site.latinName },
    },
  };

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(cat.title, typed)}
        title={t(item.name, typed)}
        subtitle={t(item.short, typed)}
        size="sm"
        crumbs={[
          { label: t(ui.nav.products, typed), href: localeHref(typed, 'produits') },
          { label: t(cat.title, typed), href: localeHref(typed, `produits/${cat.slug}`) },
          { label: t(item.name, typed) },
        ]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* ------------------------------------------------------- visual */}
            <div className="lg:col-span-6">
              <Reveal>
                <div className="relative overflow-hidden rounded-4xl bg-brand-950 shadow-card">
                  <div className="relative aspect-[4/3]">
                    <SmartImage
                      src={cat.image}
                      alt={t(item.name, typed)}
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover opacity-95"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-brand-950/20" />
                  </div>

                  <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/92 px-3.5 py-1.5 text-[.72rem] font-bold text-brand-950 backdrop-blur">
                      <Icon name={cat.icon} className="h-3.5 w-3.5 text-accent-600" />
                      {t(cat.title, typed)}
                    </span>
                    <span className="rounded-full bg-brand-950/70 px-3.5 py-1.5 text-[.72rem] font-bold text-white backdrop-blur">
                      {item.brand}
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {item.specs.slice(0, 4).map((spec, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 text-center"
                    >
                      <p className="text-[.68rem] font-bold uppercase tracking-wide text-ink-500">
                        {t(spec.label, typed)}
                      </p>
                      <p className="mt-1.5 text-[.82rem] font-extrabold leading-snug text-brand-950">
                        {t(spec.value, typed)}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* --------------------------------------------------------- info */}
            <div className="lg:col-span-6">
              <Reveal>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5 rounded-full bg-accent-50 px-3.5 py-1.5 text-[.8rem] font-extrabold text-accent-700">
                    <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
                    {item.rating}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[.8rem] font-bold text-emerald-600">
                    <Check className="h-4 w-4" strokeWidth={3} />
                    {t(availabilityOf(item), typed)}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[.8rem] font-bold text-ink-500">
                    <ShieldCheck className="h-4 w-4 text-accent-600" strokeWidth={2.4} />
                    {t(ui.products.guarantee, typed)}: {item.warrantyMonths}{' '}
                    {t(ui.products.months, typed)}
                  </span>
                </div>

                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50/60 p-6">
                  <div className="flex flex-wrap items-end gap-4">
                    {item.price !== null ? (
                      <>
                        <p className="text-[2rem] font-black leading-none text-brand-950">
                          {formatPrice(item.price, typed)}
                        </p>
                        {item.oldPrice && (
                          <p className="text-[1rem] font-bold text-ink-500 line-through">
                            {formatPrice(item.oldPrice, typed)}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-[1.4rem] font-black text-brand-950">
                        {t(ui.products.priceOnRequest, typed)}
                      </p>
                    )}
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {[
                      { ar: 'توصيل داخل طنجة مجانًا', fr: 'Livraison offerte dans Tanger' },
                      { ar: 'تركيب وتشغيل من فريقنا', fr: 'Installation et mise en service par nos soins' },
                      { ar: 'ضمان المصنّع + ضمان التركيب', fr: 'Garantie constructeur + garantie de pose' },
                    ].map((perk, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[.84rem] text-ink-700">
                        <Truck className="h-4 w-4 shrink-0 text-accent-600" strokeWidth={2.2} />
                        {t(perk, typed)}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={site.phoneHref}
                      className="btn-primary flex-1"
                      dir="ltr"
                    >
                      <Phone className="h-4 w-4" strokeWidth={2.4} />
                      {site.phoneDisplay}
                    </a>
                    <a
                      href={`https://wa.me/${site.whatsapp}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp flex-1"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
                      {t(ui.products.orderNow, typed)}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={90}>
                <div className="mt-8">
                  <h2 className="text-[1.05rem] font-extrabold text-brand-950">
                    {t(ui.common.description, typed)}
                  </h2>
                  <p className="mt-3 text-[.92rem] leading-[1.95] text-ink-700">
                    {t(item.description, typed)}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-8">
                  <h2 className="text-[1.05rem] font-extrabold text-brand-950">
                    {t(ui.common.specifications, typed)}
                  </h2>
                  <dl className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                    {item.specs.map((spec, i) => (
                      <div
                        key={i}
                        className={`grid grid-cols-2 gap-4 px-4 py-3.5 text-[.85rem] ${
                          i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                        }`}
                      >
                        <dt className="font-semibold text-ink-500">{t(spec.label, typed)}</dt>
                        <dd className="font-bold text-brand-950">{t(spec.value, typed)}</dd>
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-4 bg-white px-4 py-3.5 text-[.85rem]">
                      <dt className="font-semibold text-ink-500">{t(ui.common.brand, typed)}</dt>
                      <dd className="font-bold text-brand-950">{item.brand}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- related */}
      {related.length > 0 && (
        <section className="section bg-slate-50/70">
          <div className="container">
            <Reveal>
              <SectionHeading
                eyebrow={t(ui.products.relatedProducts, typed)}
                title={t(ui.products.relatedProducts, typed)}
              />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70} className="h-full">
                  <ProductCard product={p} locale={typed} />
                </Reveal>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                href={localeHref(typed, `produits/${cat.slug}`)}
                className="btn-outline !px-8 !py-3.5"
              >
                {t(cat.title, typed)}
                <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand locale={typed} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
