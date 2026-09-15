'use client';

import { useMemo, useState } from 'react';
import { Filter, PackageSearch, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { products, productCategories, type Product } from '@/content/products';
import { ProductCard } from '@/components/cards/ProductCard';

type Sort = 'newest' | 'priceAsc' | 'priceDesc' | 'name';

export function ProductBrowser({
  locale,
  initialCategory = 'all',
}: {
  locale: Locale;
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<Sort>('newest');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  const priceCeiling = useMemo(
    () => Math.max(...products.map((p) => p.price ?? 0)),
    [],
  );

  const visible = useMemo(() => {
    let list: Product[] = category === 'all'
      ? [...products]
      : products.filter((p) => p.category === category);

    if (inStockOnly) list = list.filter((p) => p.inStock);
    if (maxPrice !== null) {
      // Products priced on request stay visible (no published price).
      list = list.filter((p) => p.price === null || p.price <= maxPrice);
    }

    switch (sort) {
      case 'priceAsc':
        list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case 'priceDesc':
        list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
        break;
      case 'name':
        list.sort((a, b) => t(a.name, locale).localeCompare(t(b.name, locale), locale));
        break;
      default:
        list.sort((a, b) => Number(b.tags.includes('new')) - Number(a.tags.includes('new')));
    }
    return list;
  }, [category, sort, maxPrice, inStockOnly, locale]);

  const activeFilters =
    (category !== 'all' ? 1 : 0) + (maxPrice !== null ? 1 : 0) + (inStockOnly ? 1 : 0);

  function reset() {
    setCategory('all');
    setSort('newest');
    setMaxPrice(null);
    setInStockOnly(false);
  }

  return (
    <div>
      {/* ------------------------------------------------------------ toolbar */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
        {/* category chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`rounded-full px-4 py-2 text-[.8rem] font-bold transition ${
              category === 'all'
                ? 'bg-brand-950 text-white'
                : 'bg-slate-100 text-ink-700 hover:bg-slate-200'
            }`}
          >
            {t(ui.products.allCategories, locale)}
          </button>
          {productCategories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={`rounded-full px-4 py-2 text-[.8rem] font-bold transition ${
                category === c.slug
                  ? 'bg-brand-950 text-white'
                  : 'bg-slate-100 text-ink-700 hover:bg-slate-200'
              }`}
            >
              {t(c.title, locale)}
            </button>
          ))}
        </div>

        {/* secondary controls */}
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-slate-100 pt-4">
          <label className="inline-flex items-center gap-2.5 text-[.8rem] font-bold text-ink-700">
            <Filter className="h-4 w-4 text-accent-600" strokeWidth={2.4} />
            {t(ui.products.sortBy, locale)}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[.8rem] font-semibold text-brand-950 outline-none focus:border-accent-500"
            >
              <option value="newest">{t(ui.products.sortNewest, locale)}</option>
              <option value="priceAsc">{t(ui.products.sortPriceAsc, locale)}</option>
              <option value="priceDesc">{t(ui.products.sortPriceDesc, locale)}</option>
              <option value="name">{t(ui.products.sortName, locale)}</option>
            </select>
          </label>

          <label className="inline-flex items-center gap-2.5 text-[.8rem] font-bold text-ink-700">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-slate-300 text-accent-500 focus:ring-accent-500/30"
            />
            {t(ui.products.inStock, locale)}
          </label>

          <label className="inline-flex min-w-[210px] flex-1 items-center gap-3 text-[.8rem] font-bold text-ink-700">
            <span className="shrink-0">
              {maxPrice === null
                ? t(ui.products.priceOnRequest, locale)
                : `≤ ${new Intl.NumberFormat('fr-MA').format(maxPrice)} ${
                    locale === 'ar' ? 'د.م.' : 'MAD'
                  }`}
            </span>
            <input
              type="range"
              min={0}
              max={priceCeiling}
              step={100}
              value={maxPrice ?? priceCeiling}
              onChange={(e) => {
                const v = Number(e.target.value);
                setMaxPrice(v >= priceCeiling ? null : v);
              }}
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-accent-500"
              aria-label={t(ui.products.filters, locale)}
            />
          </label>

          <div className="ms-auto flex items-center gap-4">
            <span className="text-[.78rem] font-semibold text-ink-500">
              {visible.length} {t(ui.products.resultsCount, locale)}
            </span>
            {activeFilters > 0 && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3.5 py-1.5 text-[.76rem] font-bold text-rose-600 transition hover:bg-rose-100"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.8} />
                {activeFilters}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------- results */}
      {visible.length === 0 ? (
        <div className="mt-14 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-20 text-center">
          <PackageSearch className="h-12 w-12 text-slate-300" strokeWidth={1.6} />
          <p className="mt-5 text-[1rem] font-bold text-brand-950">
            {t(ui.common.noResults, locale)}
          </p>
          <button type="button" onClick={reset} className="btn-outline mt-5">
            {t(ui.common.filter, locale)}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
