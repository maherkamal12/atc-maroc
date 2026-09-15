import Link from 'next/link';
import { ArrowRight, Check, ShoppingBag, Star } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { productCategories, availabilityOf, type Product } from '@/content/products';
import { Icon } from '@/components/ui/Icon';
import { SmartImage } from '@/components/ui/SmartImage';

export function formatPrice(value: number, locale: Locale) {
  const n = new Intl.NumberFormat('fr-MA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return locale === 'ar' ? `${n} د.م.` : `${n} MAD`;
}

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const category = productCategories.find((c) => c.slug === product.category);
  const href = localeHref(locale, `produits/${product.category}/${product.slug}`);
  const discount =
    product.oldPrice && product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <article className="group card card-hover flex h-full flex-col overflow-hidden">
      {/* --------------------------------------------------------- visual */}
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-brand-950">
        {category && (
          <SmartImage
            src={category.image}
            alt={t(product.name, locale)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover opacity-90 transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
          />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/25 to-brand-950/10" />

        {/* category chip */}
        <span className="absolute start-3 top-3 flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-[.68rem] font-bold text-brand-950 backdrop-blur">
          {category && <Icon name={category.icon} className="h-3.5 w-3.5 text-accent-600" />}
          {category ? t(category.title, locale) : ''}
        </span>

        {/* badges */}
        <span className="absolute end-3 top-3 flex flex-col items-end gap-1.5">
          {product.tags.includes('promo') && discount > 0 && (
            <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[.66rem] font-extrabold text-white">
              −{discount}%
            </span>
          )}
          {product.tags.includes('new') && (
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[.66rem] font-extrabold text-white">
              {t(ui.common.new, locale)}
            </span>
          )}
          {product.tags.includes('bestseller') && (
            <span className="rounded-full bg-accent-500 px-2.5 py-1 text-[.66rem] font-extrabold text-brand-950">
              {t(ui.common.bestseller, locale)}
            </span>
          )}
        </span>

        {/* brand + rating */}
        <span className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <span className="rounded-full bg-brand-950/60 px-3 py-1 text-[.68rem] font-bold text-white backdrop-blur">
            {product.brand}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-950/60 px-2.5 py-1 text-[.66rem] font-bold text-white backdrop-blur">
            <Star className="h-3 w-3 fill-accent-400 text-accent-400" />
            {product.rating}
          </span>
        </span>
      </Link>

      {/* ----------------------------------------------------------- body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[.98rem] font-extrabold leading-snug text-brand-950">
          <Link href={href} className="transition hover:text-brand-700">
            {t(product.name, locale)}
          </Link>
        </h3>
        <p className="mt-2.5 line-clamp-2 flex-1 text-[.82rem] leading-[1.75] text-ink-500">
          {t(product.short, locale)}
        </p>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {product.specs.slice(0, 2).map((spec, i) => (
            <span
              key={i}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[.68rem] font-semibold text-ink-700"
            >
              {t(spec.value, locale)}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-[.72rem] font-semibold text-emerald-600">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
          {t(availabilityOf(product), locale)}
          <span className="text-ink-500">
            · {product.warrantyMonths >= 12
              ? `${Math.round(product.warrantyMonths / 12)} ${locale === 'ar' ? 'سنة' : 'an'}${
                  Math.round(product.warrantyMonths / 12) > 1 ? (locale === 'ar' ? '' : 's') : ''
                }`
              : `${product.warrantyMonths} ${t(ui.products.months, locale)}`}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="min-w-0">
            {product.price !== null ? (
              <>
                {product.oldPrice && (
                  <p className="text-[.72rem] font-semibold text-ink-500 line-through">
                    {formatPrice(product.oldPrice, locale)}
                  </p>
                )}
                <p className="text-[1.05rem] font-black text-brand-950">
                  {formatPrice(product.price, locale)}
                </p>
              </>
            ) : (
              <p className="text-[.9rem] font-extrabold text-brand-950">
                {t(ui.products.priceOnRequest, locale)}
              </p>
            )}
          </div>
          <Link
            href={href}
            aria-label={t(product.name, locale)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-950 text-white transition hover:bg-accent-500 hover:text-brand-950"
          >
            <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductCtaCard({ locale }: { locale: Locale }) {
  return (
    <article className="flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 to-brand-950 p-7 text-white shadow-card">
      <div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500 text-brand-950">
          <ShoppingBag className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <h3 className="mt-6 text-[1.15rem] font-extrabold leading-snug text-white">
          {t(ui.products.eyebrow, locale)}
        </h3>
        <p className="mt-3 text-[.88rem] leading-[1.85] text-white/65">
          {t(ui.products.subtitle, locale)}
        </p>
      </div>
      <Link href={localeHref(locale, 'produits')} className="btn-primary mt-7 w-full">
        {t(ui.common.seeAllProducts, locale)}
        <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
      </Link>
    </article>
  );
}
