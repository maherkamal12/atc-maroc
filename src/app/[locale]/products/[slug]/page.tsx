import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToQuote } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { PageHero } from "@/components/ui";
import {
  categoryName,
  getCategories,
  getProduct,
  getRelatedProducts,
  productDesc,
  productName,
  productSpecs,
} from "@/lib/data";
import { t } from "@/lib/i18n";
import { isLocale, site, type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);

  const product = await getProduct(slug);
  if (!product) notFound();

  const [categories, related] = await Promise.all([
    getCategories(),
    getRelatedProducts(product.categorySlug, product.slug, 4),
  ]);
  const category = categories.find((item) => item.slug === product.categorySlug);
  const specs = productSpecs(product, locale);

  return (
    <>
      <PageHero
        title={productName(product, locale)}
        subtitle={`${product.brand}${category ? ` · ${categoryName(category, locale)}` : ""}`}
        breadcrumbs={[
          { href: `/${locale}`, label: tr.breadcrumbHome },
          { href: `/${locale}/products`, label: tr.ourProducts },
          ...(category
            ? [
                {
                  href: `/${locale}/products?category=${category.slug}`,
                  label: categoryName(category, locale),
                },
              ]
            : []),
          { label: productName(product, locale) },
        ]}
        image={product.image}
      />

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={productName(product, locale)}
              className="h-80 w-full bg-white object-contain p-6 md:h-[28rem]"
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-500">
              {product.brand}
            </span>
            <h1 className="mt-2 text-2xl font-extrabold leading-snug text-brand-950 md:text-3xl">
              {productName(product, locale)}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-2 text-sm font-extrabold text-accent-700">
                💬 {tr.priceOnRequest}
              </span>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                  product.inStock ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {product.inStock ? tr.inStock : tr.outOfStock}
              </span>
            </div>

            <p className="mt-4 rounded-xl bg-slate-50 p-4 text-[13px] leading-relaxed text-slate-600">
              {locale === "fr"
                ? "Les prix ne sont pas publiés sur le site. Ajoutez ce produit à votre liste de devis : un conseiller technique vous répond avec un chiffrage détaillé (matériel, livraison et installation)."
                : "لا تُنشر الأسعار في الموقع. أضف هذا المنتج إلى قائمة عرض السعر وسيجيبك أحد مستشارينا التقنيين بتسعيرة مفصلة (المواد، التوصيل والتركيب)."}
            </p>

            <p className="mt-5 text-[15px] leading-loose text-slate-700">{productDesc(product, locale)}</p>

            {specs.length > 0 && (
              <>
                <h2 className="mt-8 text-base font-extrabold text-brand-950">{tr.specs}</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-[13px] font-semibold text-slate-700"
                    >
                      <span className="text-accent-600">✔</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-8">
              <AddToQuote
                product={{
                  slug: product.slug,
                  nameAr: product.nameAr,
                  nameFr: product.nameFr,
                  image: product.image,
                }}
                labels={{ addToQuote: tr.addToQuote, added: tr.added, quantity: tr.quantity }}
              />
            </div>

            <div className="mt-8 grid gap-3 rounded-2xl bg-brand-50 p-5 text-[13px] text-brand-900 sm:grid-cols-2">
              <p>🚚 {locale === "fr" ? "Livraison partout au Maroc" : "التوصيل لكل المغرب"}</p>
              <p>🛠️ {locale === "fr" ? "Installation par nos équipes" : "التركيب من طرف فرقنا"}</p>
              <p>🧾 {locale === "fr" ? "Facture et garantie" : "فاتورة وضمان"}</p>
              <p>
                📞{" "}
                <a href={`tel:${site.phone}`} className="font-bold underline">
                  {site.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="wrap">
            <h2 className="mb-8 text-xl font-extrabold text-brand-950 md:text-2xl">
              {tr.relatedProducts}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard
                  key={item.slug}
                  locale={locale}
                  product={{
                    slug: item.slug,
                    name: productName(item, locale),
                    nameAr: item.nameAr,
                    nameFr: item.nameFr,
                    description: productDesc(item, locale),
                    image: item.image,
                    brand: item.brand,
                    inStock: item.inStock,
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
            <div className="mt-8">
              <Link href={`/${locale}/products`} className="btn btn-dark">
                {tr.viewAll}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
