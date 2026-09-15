import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { isLocale, localeHref, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { services } from '@/content/services';
import { PageHero } from '@/components/ui/PageHero';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessSteps } from '@/components/home/ProcessSteps';
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
    title: t(ui.nav.services, locale),
    description: t(ui.services.subtitle, locale),
    alternates: {
      canonical: `/${locale}/services`,
      languages: { ar: '/ar/services', fr: '/fr/services', 'x-default': '/ar/services' },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(ui.services.eyebrow, typed)}
        title={t(ui.services.title, typed)}
        subtitle={t(ui.services.subtitle, typed)}
        crumbs={[{ label: t(ui.nav.services, typed) }]}
      >
        <ul className="flex flex-wrap gap-2.5">
          {services.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-[.78rem] font-bold text-white/80 backdrop-blur transition hover:border-accent-400/60 hover:text-white"
              >
                <Icon name={s.icon} className="h-3.5 w-3.5 text-accent-400" />
                {t(s.title, typed)}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* ------------------------------------------------------------ grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 60} className="h-full">
                <ServiceCard service={service} locale={typed} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- detailed overview */}
      <section className="section bg-slate-50/70">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t(ui.services.scope, typed)}
              title={t(ui.services.title, typed)}
              subtitle={t(ui.services.subtitle, typed)}
            />
          </Reveal>

          <div className="mt-14 space-y-6">
            {services.map((service, i) => {
              const tone = tones[service.tone];
              return (
                <Reveal key={service.slug} delay={40} as="article">
                  <div
                    id={service.slug}
                    className="card scroll-mt-28 overflow-hidden p-7 lg:p-9"
                  >
                    <div className="grid gap-8 lg:grid-cols-12">
                      <div className="lg:col-span-5">
                        <span
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tone.bg} ${tone.text}`}
                        >
                          <Icon name={service.icon} className="h-7 w-7" />
                        </span>
                        <h3 className="mt-5 text-[1.3rem] font-extrabold text-brand-950">
                          {t(service.title, typed)}
                        </h3>
                        <p className="mt-2 text-[.84rem] font-bold text-accent-700">
                          {t(service.tagline, typed)}
                        </p>
                        <p className="mt-5 text-[.9rem] leading-[1.9] text-ink-500">
                          {t(service.short, typed)}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <Link
                            href={localeHref(typed, `services/${service.slug}`)}
                            className="btn-dark !py-2.5 !text-[.82rem]"
                          >
                            {t(ui.common.viewDetails, typed)}
                            <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
                          </Link>
                          <a
                            href={site.phoneHref}
                            className="btn-outline !py-2.5 !text-[.82rem]"
                            dir="ltr"
                          >
                            <Phone className="h-4 w-4" strokeWidth={2.4} />
                            {site.phoneDisplay}
                          </a>
                        </div>
                      </div>

                      <div className="lg:col-span-7">
                        <p className="text-[.72rem] font-extrabold uppercase tracking-[.14em] text-ink-500">
                          {t(ui.services.scope, typed)}
                        </p>
                        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                          {service.scope.map((item, k) => (
                            <li
                              key={k}
                              className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3.5"
                            >
                              <span
                                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tone.bg} ${tone.text}`}
                              >
                                <Icon name={item.icon} className="h-4 w-4" strokeWidth={2.2} />
                              </span>
                              <span className="text-[.82rem] font-bold leading-snug text-brand-950">
                                {t(item.title, typed)}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {service.benefits.slice(0, 4).map((benefit, k) => (
                            <li
                              key={k}
                              className="inline-flex items-start gap-2 text-[.8rem] leading-snug text-ink-500"
                            >
                              <Check
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                                strokeWidth={3}
                              />
                              {t(benefit, typed)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessSteps locale={typed} />
      <CtaBand locale={typed} />
    </>
  );
}
