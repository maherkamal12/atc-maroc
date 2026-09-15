import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Building2, Compass, Target, Users } from 'lucide-react';
import { isLocale, localeHref, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site, sectors } from '@/content/site';
import { services } from '@/content/services';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { StatsBand } from '@/components/home/StatsBand';
import { Testimonials } from '@/components/home/Testimonials';
import { CtaBand } from '@/components/home/CtaBand';
import { Icon, tones } from '@/components/ui/Icon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(ui.nav.about, locale),
    description: t(ui.about.subtitle, locale),
    alternates: {
      canonical: `/${locale}/a-propos`,
      languages: { ar: '/ar/a-propos', fr: '/fr/a-propos', 'x-default': '/ar/a-propos' },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  const valueIcons = [Target, Compass, Building2, Users];

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(ui.about.eyebrow, typed)}
        title={t(ui.about.title, typed)}
        subtitle={t(ui.about.subtitle, typed)}
        crumbs={[{ label: t(ui.nav.about, typed) }]}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: ui.about.missionTitle, icon: Target },
            { label: ui.about.visionTitle, icon: Compass },
            { label: ui.about.valuesTitle, icon: Users },
          ].map((item, i) => {
            const IconCmp = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[.06] px-4 py-3.5 backdrop-blur"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-500 text-brand-950">
                  <IconCmp className="h-4.5 w-4.5" strokeWidth={2.4} />
                </span>
                <span className="text-[.86rem] font-bold text-white">
                  {t(item.label, typed)}
                </span>
              </div>
            );
          })}
        </div>
      </PageHero>

      {/* ------------------------------------------------------------ mission */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal>
                <figure className="relative overflow-hidden rounded-4xl shadow-lift">
                  <div className="relative aspect-[4/3]">
                    <SmartImage
                      src="/images/about/mission.jpg"
                      alt={t(ui.about.missionTitle, typed)}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <span className="eyebrow">{t(ui.about.missionTitle, typed)}</span>
                <h2 className="mt-5 text-[1.6rem] font-extrabold leading-tight text-brand-950 lg:text-[2rem]">
                  {t(ui.about.missionTitle, typed)}
                </h2>
                <p className="mt-6 text-[.98rem] leading-[1.95] text-ink-700">
                  {t(ui.about.missionBody, typed)}
                </p>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-8 border-s-4 border-accent-500 ps-6">
                  <h3 className="text-[1.05rem] font-extrabold text-brand-950">
                    {t(ui.about.visionTitle, typed)}
                  </h3>
                  <p className="mt-3 text-[.95rem] leading-[1.95] text-ink-700">
                    {t(ui.about.visionBody, typed)}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- objective */}
      <section className="bg-slate-50/70 py-14">
        <div className="container">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="eyebrow">{t(ui.about.objectiveTitle, typed)}</span>
                <p className="mt-6 text-[1rem] leading-[1.95] text-ink-700">
                  {t(ui.about.objectiveBody, typed)}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li
                      key={s.slug}
                      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[.76rem] font-bold text-ink-700"
                    >
                      {t(s.title, typed)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5">
                <figure className="relative overflow-hidden rounded-3xl shadow-card">
                  <div className="relative aspect-[4/3]">
                    <SmartImage
                      src="/images/about/office.jpg"
                      alt={t(ui.about.objectiveTitle, typed)}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsBand locale={typed} />

      {/* ----------------------------------------------------------------- values */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t(ui.about.valuesTitle, typed)}
              title={t(ui.about.valuesTitle, typed)}
              subtitle={t(ui.about.valuesSubtitle, typed)}
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ui.about.values.map((value, i) => {
              const IconCmp = valueIcons[i];
              return (
                <Reveal key={i} delay={i * 80} className="h-full">
                  <article className="card card-hover h-full p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-950 text-accent-400">
                      <IconCmp className="h-5.5 w-5.5" strokeWidth={2.1} />
                    </span>
                    <h3 className="mt-5 text-[1rem] font-extrabold text-brand-950">
                      {t(value.title, typed)}
                    </h3>
                    <p className="mt-3 text-[.86rem] leading-[1.85] text-ink-500">
                      {t(value.body, typed)}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- team + sectors */}
      <section className="section bg-slate-50/70">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionHeading
                  eyebrow={t(ui.about.teamTitle, typed)}
                  title={t(ui.about.teamTitle, typed)}
                  subtitle={t(ui.about.teamSubtitle, typed)}
                  align="start"
                />
              </Reveal>
              <ul className="mt-8 space-y-3">
                {ui.about.team.map((member, i) => (
                  <Reveal key={i} delay={i * 60} as="li">
                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                        <Users className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <span className="text-[.9rem] font-bold text-brand-950">
                        {t(member.role, typed)}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <figure className="relative overflow-hidden rounded-4xl shadow-card">
                  <div className="relative aspect-[4/3]">
                    <SmartImage
                      src="/images/about/team.jpg"
                      alt={t(ui.about.teamTitle, typed)}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </Reveal>

              <Reveal delay={90}>
                <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
                  <h3 className="text-[1rem] font-extrabold text-brand-950">
                    {t(ui.about.sectorsTitle, typed)}
                  </h3>
                  <p className="mt-2 text-[.82rem] leading-relaxed text-ink-500">
                    {t(ui.about.sectorsSubtitle, typed)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {sectors.map((sector, i) => (
                      <li
                        key={i}
                        className="rounded-full bg-slate-100 px-3.5 py-1.5 text-[.74rem] font-semibold text-ink-700"
                      >
                        {t(sector, typed)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-6 rounded-3xl bg-brand-950 p-6 text-white">
                  <h3 className="text-[1rem] font-extrabold text-white">
                    {t(ui.about.zonesTitle, typed)}
                  </h3>
                  <p className="mt-2 text-[.84rem] leading-relaxed text-white/60">
                    {t(ui.about.zonesSubtitle, typed)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {site.zones.map((zone) => (
                      <li
                        key={zone}
                        className="rounded-full bg-white/[.07] px-3 py-1 text-[.72rem] text-white/60"
                      >
                        {zone}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- services recap */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t(ui.services.eyebrow, typed)}
              title={t(ui.services.title, typed)}
              subtitle={t(ui.services.subtitle, typed)}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const tone = tones[service.tone];
              return (
                <Reveal key={service.slug} delay={i * 60} className="h-full">
                  <Link
                    href={localeHref(typed, `services/${service.slug}`)}
                    className="card card-hover flex h-full items-start gap-4 p-5"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone.bg} ${tone.text}`}
                    >
                      <Icon name={service.icon} className="h-5.5 w-5.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[.95rem] font-extrabold text-brand-950">
                        {t(service.title, typed)}
                      </span>
                      <span className="mt-2 line-clamp-2 block text-[.8rem] leading-relaxed text-ink-500">
                        {t(service.short, typed)}
                      </span>
                      <span className={`mt-3 inline-flex items-center gap-1.5 text-[.78rem] font-extrabold ${tone.text}`}>
                        {t(ui.common.viewDetails, typed)}
                        <ArrowRight className="rtl-flip h-3.5 w-3.5" strokeWidth={2.8} />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials locale={typed} />
      <CtaBand locale={typed} />
    </>
  );
}
