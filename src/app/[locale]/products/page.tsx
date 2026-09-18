import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { PageHero } from "@/components/ui";
import {
  categoryName,
  countProductsByCategory,
  getCategories,
  getProductsPage,
  productDesc,
  productName,
} from "@/lib/data";
import { t } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/site";
import { heroImages } from "@/db/seed-data";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 24;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);
  const query = await searchParams;

  const category = first(query.category);
  const q = first(query.q);
  const sortParam = first(query.sort);
  const sort = sortParam === "name" ? "name" : ("newest" as const);
  const page = Math.max(1, Number(first(query.page)) || 1);

  const [categories, counts, result] = await Promise.all([
    getCategories(),
    countProductsByCategory(),
    getProductsPage({ category: category || undefined, q: q || undefined, sort, page, pageSize: PAGE_SIZE }),
  ]);

  const activeCategory = categories.find((item) => item.slug === category);
  const buildHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (q) params.set("q", q);
    if (sort === "name") params.set("sort", "name");
    if (nextPage > 1) params.set("page", String(nextPage));
    const search = params.toString();
    return `/${locale}/products${search ? `?${search}` : ""}`;
  };

  return (
    <>
      <PageHero
        title={activeCategory ? categoryName(activeCategory, locale) : tr.ourProducts}
        subtitle={
          activeCategory
            ? locale === "fr"
              ? activeCategory.descFr
              : activeCategory.descAr
            : locale === "fr"
              ? "Catalogue complet importé du site officiel ATC — les prix sont communiqués sur demande."
              : "الكتالوج الكامل المستورد من الموقع الرسمي لـ ATC — الأسعار تُقدَّم عند الطلب."
        }
        breadcrumbs={[
          { href: `/${locale}`, label: tr.breadcrumbHome },
          { label: activeCategory ? categoryName(activeCategory, locale) : tr.ourProducts },
        ]}
        image={activeCategory?.image || heroImages.solar}
      />

      <section className="section">
        <div className="wrap">
          <div className="mb-8 grid gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 md:grid-cols-[1fr_auto] md:items-center">
            <form className="flex flex-wrap gap-3" action={`/${locale}/products`}>
              {category && <input type="hidden" name="category" value={category} />}
              <input
                name="q"
                defaultValue={q}
                placeholder={tr.searchPlaceholder}
                className="field md:max-w-xs"
              />
              <select name="sort" defaultValue={sort} className="field md:w-56">
                <option value="newest">{tr.sortNewest}</option>
                <option value="name">{tr.sortName}</option>
              </select>
              <button type="submit" className="btn btn-dark !py-2.5 !text-[13px]">
                {tr.search}
              </button>
            </form>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/${locale}/products`}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  category ? "bg-white text-slate-600 hover:bg-brand-50" : "bg-brand-900 text-white"
                }`}
              >
                {tr.allCategories} ({result.total})
              </Link>
              {categories.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${locale}/products?category=${item.slug}`}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    category === item.slug
                      ? "bg-brand-900 text-white"
                      : "bg-white text-slate-600 hover:bg-brand-50"
                  }`}
                >
                  {item.icon} {categoryName(item, locale)} ({counts[item.slug] ?? 0})
                </Link>
              ))}
            </div>
          </div>

          <p className="mb-6 text-sm font-semibold text-slate-500">
            {result.total} {tr.results} · {tr.priceOnRequest}
          </p>

          {result.items.length ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {result.items.map((product) => (
                  <ProductCard
                    key={product.slug}
                    locale={locale}
                    product={{
                      slug: product.slug,
                      name: productName(product, locale),
                      nameAr: product.nameAr,
                      nameFr: product.nameFr,
                      description: productDesc(product, locale),
                      image: product.image,
                      brand: product.brand,
                      inStock: product.inStock,
                    }}
                    labels={{
                      addToQuote: tr.addToQuote,
                      added: tr.added,
                      outOfStock: tr.outOfStock,
                      priceOnRequest: tr.priceOnRequest,
                    }}
                  />
                ))}
              </div>

              {result.pages > 1 && (
                <nav className="mt-12 flex flex-wrap items-center justify-center gap-2">
                  {result.page > 1 && (
                    <Link
                      href={buildHref(result.page - 1)}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand-800 hover:bg-brand-50"
                    >
                      <span aria-hidden className="rtl:rotate-180">←</span>
                    </Link>
                  )}
                  {Array.from({ length: result.pages })
                    .map((_, index) => index + 1)
                    .filter(
                      (pageNumber) =>
                        pageNumber === 1 ||
                        pageNumber === result.pages ||
                        Math.abs(pageNumber - result.page) <= 1,
                    )
                    .map((pageNumber, index, list) => (
                      <span key={pageNumber} className="flex items-center gap-2">
                        {index > 0 && pageNumber - list[index - 1] > 1 && (
                          <span className="text-slate-400">…</span>
                        )}
                        <Link
                          href={buildHref(pageNumber)}
                          className={`grid h-10 w-10 place-items-center rounded-lg text-sm font-bold transition ${
                            pageNumber === result.page
                              ? "bg-brand-900 text-white"
                              : "border border-slate-200 bg-white text-brand-800 hover:bg-brand-50"
                          }`}
                        >
                          {pageNumber}
                        </Link>
                      </span>
                    ))}
                  {result.page < result.pages && (
                    <Link
                      href={buildHref(result.page + 1)}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand-800 hover:bg-brand-50"
                    >
                      <span aria-hidden className="rtl:rotate-180">→</span>
                    </Link>
                  )}
                </nav>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <p className="text-lg font-bold text-brand-950">{tr.noProducts}</p>
              <Link href={`/${locale}/products`} className="btn btn-dark mt-6">
                {tr.allCategories}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
