import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { getCustomPageBySlug, parseSections } from "@/lib/pages";
import { t } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/site";
import { heroImages } from "@/db/seed-data";

export const dynamic = "force-dynamic";

export default async function CustomPublicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const page = await getCustomPageBySlug(slug);
  if (!page || !page.published) notFound();
  const tr = t(locale);
  const title = locale === "fr" ? page.titleFr : page.titleAr;
  const subtitle = locale === "fr" ? page.subtitleFr : page.subtitleAr;
  const sections = parseSections(page.sections);

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumbs={[{ href: `/${locale}`, label: tr.breadcrumbHome }, { label: title }]}
        image={page.heroImage || heroImages.interior}
      />
      <section className="section">
        <div className="wrap space-y-8">
          {sections.map((block, index) => {
            const heading = locale === "fr" ? block.titleFr : block.titleAr;
            const body = locale === "fr" ? block.bodyFr : block.bodyAr;
            if (block.type === "cta") {
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl bg-brand-950 p-8 text-white md:p-12"
                  style={
                    block.image
                      ? { backgroundImage: `linear-gradient(#081b3dcc,#081b3dcc),url(${block.image})`, backgroundSize: "cover" }
                      : undefined
                  }
                >
                  <h2 className="text-2xl font-extrabold">{heading}</h2>
                  <p className="mt-3 max-w-2xl text-sm text-white/75">{body}</p>
                  <Link href={`/${locale}/contact`} className="btn btn-primary mt-6">
                    {tr.ctaButton}
                  </Link>
                </div>
              );
            }
            if (block.type === "text") {
              return (
                <article key={index} className="mx-auto max-w-3xl">
                  {heading ? <h2 className="text-2xl font-extrabold text-brand-950">{heading}</h2> : null}
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-loose text-slate-700">{body}</p>
                </article>
              );
            }
            return (
              <article
                key={index}
                className={`grid gap-6 overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-2 md:p-6 ${
                  index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-2xl bg-slate-100">
                  {block.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={block.image} alt={heading} className="h-64 w-full object-cover md:h-80" />
                  ) : (
                    <div className="grid h-64 place-items-center text-slate-400 md:h-80">image</div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-extrabold text-brand-950 md:text-2xl">{heading}</h2>
                  <p className="mt-3 whitespace-pre-line text-[14.5px] leading-loose text-slate-600">{body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
