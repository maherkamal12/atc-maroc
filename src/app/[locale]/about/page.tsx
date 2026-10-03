import { notFound } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/ui";
import { getServices, serviceShort, serviceTitle } from "@/lib/data";
import { t } from "@/lib/i18n";
import { getBlock, getResolvedSite } from "@/lib/cms";
import { isLocale, type Locale } from "@/lib/site";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const tr = t(locale);
  const services = await getServices();
  const site = await getResolvedSite();
  const mission = await getBlock("about.mission", locale);
  const vision = await getBlock("about.vision", locale);
  const goals = await getBlock("about.goals", locale);
  const intro = await getBlock("about.intro", locale);
  const hours = (locale === "fr" ? site.hoursFr : site.hoursAr).split("\n").filter(Boolean);

  const blocks = [
    {
      title: locale === "fr" ? "Notre mission" : "مهمتنا",
      icon: "🎯",
      text: mission,
    },
    {
      title: locale === "fr" ? "Notre vision" : "رؤية الشركة",
      icon: "🔭",
      text: vision,
    },
    {
      title: locale === "fr" ? "Nos objectifs" : "أهدافنا",
      icon: "📈",
      text: goals,
      bullets: tr.whyPoints,
    },
  ];

  return (
    <>
      <PageHero
        title={locale === "fr" ? "À propos de nous" : "من نحن"}
        subtitle={
          locale === "fr"
            ? "ATLAS TECH CONCEPT, société spécialisée dans les solutions techniques intégrées pour le bâtiment."
            : "أطلس تك كونسيبت، شركة متخصصة في تقديم الحلول التقنية المتكاملة للمباني."
        }
        breadcrumbs={[
          { href: `/${locale}`, label: tr.breadcrumbHome },
          { label: locale === "fr" ? "À propos de nous" : "من نحن" },
        ]}
        image={site.heroElectrical}
      />

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={locale === "fr" ? "Informations" : "معلومات"}
              title={locale === "fr" ? "À propos de ATLAS TECH CONCEPT" : "عن أطلس تك كونسيبت"}
              align="start"
            />
            <p className="text-[15px] leading-loose text-slate-700">{tr.footerAbout}</p>
            <p className="mt-4 text-[15px] leading-loose text-slate-700">{intro}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { value: "12+", label: tr.statsYears },
                { value: "450+", label: tr.statsProjects },
                { value: "300+", label: tr.statsClients },
                { value: "35", label: tr.statsTeam },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-slate-50 p-5 text-center">
                  <span className="block text-2xl font-black text-accent-600">{stat.value}</span>
                  <span className="mt-1 block text-xs font-semibold text-slate-600">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {blocks.map((block) => (
              <div key={block.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg">
                    {block.icon}
                  </span>
                  <h3 className="text-lg font-extrabold text-brand-950">{block.title}</h3>
                </div>
                <p className="mt-3 text-[14px] leading-loose text-slate-600">{block.text}</p>
                {block.bullets && (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {block.bullets.map((point) => (
                      <li key={point.title} className="rounded-xl bg-slate-50 p-3">
                        <span className="block text-sm font-extrabold text-brand-900">{point.title}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-slate-600">{point.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="wrap">
          <SectionHeading title={tr.ourServices} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${locale}/services/${service.slug}`}
                className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-lg"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-lg">
                  {service.icon}
                </span>
                <span>
                  <span className="block text-[15px] font-extrabold text-brand-950">
                    {serviceTitle(service, locale)}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-slate-600">
                    {serviceShort(service, locale)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-8 rounded-3xl bg-brand-950 p-8 text-white md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">{tr.ctaTitle}</h2>
            <p className="mt-3 text-sm text-white/75">{tr.ctaText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {tr.ctaButton}
              </Link>
              <a href={`tel:${site.phone}`} className="btn btn-outline">
                📞 {site.phoneDisplay}
              </a>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-white/80">
            <li>📍 {locale === "fr" ? site.addressFr : site.addressAr}</li>
            <li>✉️ {site.email}</li>
            {hours.map((entry) => (
              <li key={entry}>🕒 {entry}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
