import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { getServices, serviceBullets, serviceShort, serviceTitle } from "@/lib/data";
import { t } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/site";
import { heroImages } from "@/db/seed-data";

export const dynamic = "force-dynamic";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);
  const services = await getServices();

  return (
    <>
      <PageHero
        title={tr.ourServices}
        subtitle={
          locale === "fr"
            ? "Électricité, plomberie, chauffage, climatisation, solaire, aménagement intérieur et design."
            : "كهرباء، سباكة، تدفئة، تكييف، طاقة شمسية، تجهيز داخلي وتصميم."
        }
        breadcrumbs={[{ href: `/${locale}`, label: tr.breadcrumbHome }, { label: tr.ourServices }]}
        image={heroImages.solar}
      />

      <section className="section">
        <div className="wrap space-y-8">
          {services.map((service, index) => (
            <article
              key={service.slug}
              className={`grid gap-6 overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-2 md:p-6 ${
                index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={serviceTitle(service, locale)}
                  className="h-64 w-full object-cover md:h-full"
                  loading="lazy"
                />
                <span className="absolute top-4 start-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/95 text-xl shadow">
                  {service.icon}
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-extrabold text-brand-950 md:text-2xl">
                  {serviceTitle(service, locale)}
                </h2>
                <p className="mt-3 text-[14.5px] leading-loose text-slate-600">
                  {serviceShort(service, locale)}
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {serviceBullets(service, locale).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-[13px] text-slate-700">
                      <span className="mt-0.5 text-accent-600">✔</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="btn btn-dark mt-6 w-fit !py-2.5 !text-[13px]"
                >
                  {tr.learnMore}
                  <span aria-hidden className="rtl:rotate-180">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
