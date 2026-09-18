import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui";
import {
  getPosts,
  getProducts,
  getServices,
  postExcerpt,
  postTag,
  postTitle,
  productDesc,
  productName,
  serviceShort,
  serviceTitle,
} from "@/lib/data";
import { t } from "@/lib/i18n";
import { formatDate, isLocale, site, type Locale } from "@/lib/site";
import { heroImages } from "@/db/seed-data";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);

  const [services, featured, posts] = await Promise.all([
    getServices(),
    getProducts({ featured: true, limit: 8 }),
    getPosts(3),
  ]);

  const slides = [
    {
      image: heroImages.solar,
      title: tr.heroTitle2,
      subtitle: tr.heroSub2,
      ctaLabel: tr.shopNow,
      ctaHref: `/${locale}/products?category=energie-solaire`,
      secondaryLabel: locale === "fr" ? "Nos services" : "خدماتنا",
      secondaryHref: `/${locale}/services`,
    },
    {
      image: heroImages.electrical,
      title: tr.heroTitle1,
      subtitle: tr.heroSub1,
      ctaLabel: tr.ctaButton,
      ctaHref: `/${locale}/contact`,
      secondaryLabel: locale === "fr" ? "En savoir plus" : "اعرف المزيد",
      secondaryHref: `/${locale}/about`,
    },
    {
      image: heroImages.interior,
      title: tr.heroTitle3,
      subtitle: tr.heroSub3,
      ctaLabel: locale === "fr" ? "Design et décoration" : "التصميم والتزيين",
      ctaHref: `/${locale}/design`,
      secondaryLabel: locale === "fr" ? "Nos produits" : "منتجاتنا",
      secondaryHref: `/${locale}/products`,
    },
  ];

  const stats = [
    { value: "12+", label: tr.statsYears },
    { value: "450+", label: tr.statsProjects },
    { value: "300+", label: tr.statsClients },
    { value: "35", label: tr.statsTeam },
  ];

  return (
    <>
      <HeroSlider slides={slides} />

      {/* features */}
      <section className="relative z-10 -mt-10">
        <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tr.features.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_20px_40px_-30px_rgba(8,27,61,0.6)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-xl">
                {["🕐", "🧰", "✅", "⚡"][index]}
              </span>
              <h3 className="mt-3 text-base font-extrabold text-brand-950">{feature.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* services */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow={locale === "fr" ? "Nos prestations" : "ما نقدمه"}
            title={tr.ourServices}
            subtitle={
              locale === "fr"
                ? "Tous les corps de métier technique du bâtiment, coordonnés par une seule équipe."
                : "كل التخصصات التقنية للمباني، منسقة من طرف فريق واحد."
            }
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href={`/${locale}/services/${service.slug}`}
                className="card group block"
              >
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={serviceTitle(service, locale)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" />
                  <div className="absolute bottom-4 start-4 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-lg">
                      {service.icon}
                    </span>
                    <h3 className="text-lg font-extrabold text-white">{serviceTitle(service, locale)}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="line-clamp-3-custom text-[13.5px] leading-relaxed text-slate-600">
                    {serviceShort(service, locale)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent-600">
                    {tr.learnMore}
                    <span aria-hidden className="rtl:rotate-180">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* why us + stats */}
      <section className="bg-brand-950 py-16 text-white">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={locale === "fr" ? "Notre engagement" : "التزامنا"}
              title={tr.whyUs}
              subtitle={tr.whyUsText}
              align="start"
              light
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {tr.whyPoints.map((point) => (
                <div key={point.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-extrabold text-accent-400">{point.title}</h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/70">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-gradient-to-br from-white/10 to-white/0 p-6 text-center"
              >
                <span className="block text-3xl font-black text-accent-400 md:text-4xl">{stat.value}</span>
                <span className="mt-2 block text-xs font-semibold text-white/70">{stat.label}</span>
              </div>
            ))}
            <div className="col-span-2 rounded-2xl border border-accent-500/40 bg-accent-500/10 p-6 text-center">
              <p className="text-sm font-bold text-accent-300">
                {locale === "fr"
                  ? "Devis gratuit et visite technique sur site"
                  : "عرض سعر مجاني وزيارة تقنية للموقع"}
              </p>
              <a href={`tel:${site.phone}`} className="btn btn-primary mt-4">
                📞 {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* design & decoration */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow={locale === "fr" ? "Design & décoration" : "ديكور وتصميم"}
            title={tr.designSection}
            subtitle={
              locale === "fr"
                ? "Nous créons des espaces qui reflètent votre identité, du plan 3D à la réalisation."
                : "نصمم مساحات تعكس هويتك، من المخطط ثلاثي الأبعاد إلى التنفيذ."
            }
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: tr.designTitle1, text: tr.designText1, image: heroImages.interior, icon: "🛋️" },
              { title: tr.designTitle2, text: tr.designText2, image: services[6]?.image ?? heroImages.solar, icon: "💡" },
              { title: tr.designTitle3, text: tr.designText3, image: services[5]?.image ?? heroImages.electrical, icon: "🏛️" },
            ].map((card) => (
              <div key={card.title} className="card overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.image} alt={card.title} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute top-3 start-3 grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-lg">
                    {card.icon}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-extrabold text-brand-950">{card.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={`/${locale}/design`} className="btn btn-dark">
              {tr.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* process */}
      <section className="bg-slate-50 py-16">
        <div className="wrap">
          <SectionHeading eyebrow={locale === "fr" ? "Méthodologie" : "منهجيتنا"} title={tr.process} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tr.processSteps.map((step, index) => (
              <div key={step.title} className="relative rounded-2xl bg-white p-6 shadow-sm">
                <span className="absolute -top-4 start-6 grid h-10 w-10 place-items-center rounded-full bg-accent-500 text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-extrabold text-brand-950">{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* products */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow={locale === "fr" ? "Boutique" : "المتجر"}
            title={tr.latestProducts}
            subtitle={
              locale === "fr"
                ? "Catalogue officiel ATC : onduleurs, panneaux, batteries, régulateurs, pompes, structures et chauffage. Prix sur demande."
                : "الكتالوج الرسمي لـ ATC: محولات، ألواح، بطاريات، وحدات تحكم، مضخات، هياكل تثبيت وتدفئة. السعر عند الطلب."
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
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
          <div className="mt-10 text-center">
            <Link href={`/${locale}/products`} className="btn btn-dark">
              {tr.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* blog */}
      <section className="bg-slate-50 py-16">
        <div className="wrap">
          <SectionHeading eyebrow={locale === "fr" ? "Actualités" : "أخبار ونصائح"} title={tr.ourBlog} />
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="card group block">
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={postTitle(post, locale)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 start-3 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold text-white">
                    {postTag(post, locale)}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {formatDate(post.publishedAt, locale)} · {post.readMinutes} {tr.minutes}
                  </span>
                  <h3 className="mt-2 line-clamp-2-custom text-[15px] font-extrabold text-brand-950 group-hover:text-accent-600">
                    {postTitle(post, locale)}
                  </h3>
                  <p className="mt-2 line-clamp-3-custom text-[13px] leading-relaxed text-slate-600">
                    {postExcerpt(post, locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-900">
        <div className="wrap relative flex flex-col items-center gap-6 py-14 text-center text-white">
          <h2 className="max-w-2xl text-2xl font-extrabold md:text-3xl">{tr.ctaTitle}</h2>
          <p className="max-w-xl text-sm text-white/75">{tr.ctaText}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {tr.ctaButton}
            </Link>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-outline">
              WhatsApp
            </a>
          </div>
          <p className="mt-2 text-xs text-white/60">
            {locale === "fr" ? site.addressFr : site.addressAr}
          </p>
        </div>
      </section>
    </>
  );
}
