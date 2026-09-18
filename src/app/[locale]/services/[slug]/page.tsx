import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import {
  getService,
  getServices,
  serviceBullets,
  serviceShort,
  serviceTitle,
} from "@/lib/data";
import { t } from "@/lib/i18n";
import { isLocale, site, type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);

  const [service, services] = await Promise.all([getService(slug), getServices()]);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 6);
  const paragraphs = (locale === "fr" ? service.bodyFr : service.bodyAr)
    .split("\n")
    .filter(Boolean);

  return (
    <>
      <PageHero
        title={serviceTitle(service, locale)}
        subtitle={serviceShort(service, locale)}
        breadcrumbs={[
          { href: `/${locale}`, label: tr.breadcrumbHome },
          { href: `/${locale}/services`, label: tr.ourServices },
          { label: serviceTitle(service, locale) },
        ]}
        image={service.image}
      />

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <article>
            <div className="flex items-center gap-4 rounded-2xl bg-brand-50 p-5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
                {service.icon}
              </span>
              <h2 className="text-xl font-extrabold text-brand-950 md:text-2xl">
                {serviceTitle(service, locale)}
              </h2>
            </div>
            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-[15px] leading-loose text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            <h3 className="mt-10 text-lg font-extrabold text-brand-950">
              {locale === "fr" ? "Prestations incluses" : "الخدمات المشمولة"}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {serviceBullets(service, locale).map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-700"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-500/10 text-accent-600">
                    ✔
                  </span>
                  {bullet}
                </div>
              ))}
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={service.image} alt="" className="h-72 w-full object-cover" loading="lazy" />
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-brand-950">
                {locale === "fr" ? "Autres services" : "خدمات أخرى"}
              </h3>
              <ul className="mt-4 space-y-1">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${locale}/services/${item.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                    >
                      <span>{item.icon}</span>
                      {serviceTitle(item, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-950 p-6 text-white">
              <h3 className="text-lg font-extrabold">{tr.ctaButton}</h3>
              <p className="mt-2 text-sm text-white/75">{tr.ctaText}</p>
              <a href={`tel:${site.phone}`} className="btn btn-primary mt-5 w-full">
                📞 {site.phoneDisplay}
              </a>
              <Link href={`/${locale}/contact`} className="btn btn-outline mt-3 w-full">
                {tr.contactUs}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
