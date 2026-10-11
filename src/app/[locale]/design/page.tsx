import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/ui";
import { getPosts, postTitle } from "@/lib/data";
import { t } from "@/lib/i18n";
import { getBlock } from "@/lib/cms";
import { isLocale, site, type Locale } from "@/lib/site";
import { heroImages } from "@/db/seed-data";

export const dynamic = "force-dynamic";

export default async function DesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);

  const [heroTitle, heroSub, heroImg, t1, x1, i1, t2, x2, i2, t3, x3, i3] = await Promise.all([
    getBlock("design.heroTitle", locale),
    getBlock("design.heroSub", locale),
    getBlock("design.hero.image", locale),
    getBlock("design.block1.title", locale),
    getBlock("design.block1.text", locale),
    getBlock("design.block1.image", locale),
    getBlock("design.block2.title", locale),
    getBlock("design.block2.text", locale),
    getBlock("design.block2.image", locale),
    getBlock("design.block3.title", locale),
    getBlock("design.block3.text", locale),
    getBlock("design.block3.image", locale),
  ]);

  const gallery = [
    { image: i1 || heroImages.interior, title: t1, text: x1 },
    { image: i2 || heroImages.solar, title: t2, text: x2 },
    { image: i3 || heroImages.electrical, title: t3, text: x3 },
  ];

  const posts = await getPosts(3);

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSub}
        breadcrumbs={[{ href: `/${locale}`, label: tr.breadcrumbHome }, { label: heroTitle }]}
        image={heroImg || heroImages.interior}
      />

      <section className="section">
        <div className="wrap space-y-6">
          {gallery.map((item, index) => (
            <article
              key={item.title}
              className={`grid gap-6 overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-2 md:p-6 ${
                index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="h-64 w-full object-cover md:h-80" loading="lazy" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-extrabold text-brand-950 md:text-2xl">{item.title}</h2>
                <p className="mt-3 text-[14.5px] leading-loose text-slate-600">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="wrap">
          <SectionHeading
            title={locale === "fr" ? "Notre approche du design" : "منهجيتنا في التصميم"}
            subtitle={
              locale === "fr"
                ? "Écoute, esquisse, plan 3D, sélection des matériaux, réalisation et contrôle qualité."
                : "استماع، رسم أولي، مخطط ثلاثي الأبعاد، اختيار الخامات، تنفيذ ومراقبة الجودة."
            }
          />
          <div className="grid gap-6 md:grid-cols-4">
            {tr.processSteps.map((step, index) => (
              <div key={step.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="text-3xl font-black text-brand-100">0{index + 1}</span>
                <h3 className="mt-2 text-base font-extrabold text-brand-950">{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-8 rounded-3xl bg-gradient-to-br from-brand-900 to-brand-950 p-8 text-white md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">{tr.ctaTitle}</h2>
            <p className="mt-3 text-sm text-white/75">{tr.ctaText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {tr.ctaButton}
              </Link>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-outline">
                WhatsApp
              </a>
            </div>
          </div>
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="block rounded-xl bg-white/5 p-4 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                >
                  {postTitle(post, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
