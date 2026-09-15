import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { isLocale, localeHref, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { site } from '@/content/site';
import { getService, services } from '@/content/services';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Icon, tones } from '@/components/ui/Icon';
import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { CtaBand } from '@/components/home/CtaBand';
import { SmartImage } from '@/components/ui/SmartImage';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) return {};

  return {
    title: t(service.title, locale),
    description: t(service.short, locale),
    keywords: t(service.keywords, locale).split('،').join(',').split(','),
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        ar: `/ar/services/${slug}`,
        fr: `/fr/services/${slug}`,
        'x-default': `/ar/services/${slug}`,
      },
    },
    openGraph: {
      title: t(service.title, locale),
      description: t(service.short, locale),
      images: [{ url: service.image, width: 1200, height: 630, alt: t(service.title, locale) }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const service = getService(slug);
  if (!service) notFound();

  const typed = locale as Locale;
  const tone = tones[service.tone];
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const faqItems = service.faq.map((f) => ({ q: t(f.q, typed), a: t(f.a, typed) }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t(service.title, typed),
    description: t(service.short, typed),
    serviceType: t(service.title, typed),
    provider: {
      '@type': 'GeneralContractor',
      name: site.latinName,
      telephone: site.phone,
      address: t(site.address, typed),
    },
    areaServed: site.zones.map((z) => ({ '@type': 'City', name: z })),
    ...(faqItems.length
      ? {
          mainEntity: faqItems.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : {}),
  };

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(ui.services.eyebrow, typed)}
        title={t(service.title, typed)}
        subtitle={t(service.tagline, typed)}
        crumbs={[
          { label: t(ui.nav.services, typed), href: localeHref(typed, 'services') },
          { label: t(service.title, typed) },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href={localeHref(typed, 'contact')} className="btn-primary !py-3">
            {t(ui.common.requestQuote, typed)}
            <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
              `${t(ui.common.whatsappMessage, typed)} — ${t(service.title, typed)}`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !py-3"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
            {t(ui.common.whatsapp, typed)}
          </a>
        </div>
      </PageHero>

      {/* --------------------------------------------------------- hero image */}
      <section className="bg-white pt-14">
        <div className="container">
          <Reveal>
            <figure className="relative overflow-hidden rounded-4xl bg-brand-950 shadow-lift">
              <div className="relative aspect-[21/9]">
                <SmartImage
                  src={service.image}
                  alt={t(service.title, typed)}
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute inset-x-6 bottom-6 flex flex-wrap items-center gap-3">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 ${tone.text}`}
                >
                  <Icon name={service.icon} className="h-5.5 w-5.5" />
                </span>
                <span className="text-[1rem] font-extrabold text-white drop-shadow">
                  {t(service.title, typed)}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- intro + body */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-[1.05rem] font-semibold leading-[1.95] text-brand-900">
                  {t(service.intro, typed)}
                </p>
              </Reveal>
              <div className="prose-atc mt-7">
                {service.body.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <p className={i > 0 ? 'mt-5' : ''}>{t(paragraph, typed)}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={120}>
                <div className="mt-10">
                  <h2 className="flex items-center gap-3 text-[1.15rem] font-extrabold text-brand-950">
                    <ClipboardList className="h-5 w-5 text-accent-600" strokeWidth={2.2} />
                    {t(ui.services.process, typed)}
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <Check className="h-3.5 w-3.5" strokeWidth={3.2} />
                        </span>
                        <span className="text-[.92rem] leading-[1.85] text-ink-700">
                          {t(bullet, typed)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* ------------------------------------------------------ sidebar */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <div className="card overflow-hidden">
                    <div className={`bg-gradient-to-br ${tone.grad} p-6`}>
                      <p className="text-[.72rem] font-extrabold uppercase tracking-[.14em] text-white/80">
                        {t(ui.services.deliverables, typed)}
                      </p>
                      <h2 className="mt-2 text-[1.15rem] font-extrabold text-white">
                        {t(service.title, typed)}
                      </h2>
                    </div>
                    <ul className="space-y-4 p-6">
                      {service.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-600"
                            strokeWidth={2.4}
                          />
                          <span className="text-[.88rem] leading-[1.8] text-ink-700">
                            {t(d, typed)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={80}>
                  <div className="mt-6 rounded-3xl bg-brand-950 p-6 text-white">
                    <p className="text-[1rem] font-extrabold text-white">
                      {t(ui.services.ctaTitle, typed)}
                    </p>
                    <p className="mt-3 text-[.86rem] leading-[1.85] text-white/60">
                      {t(ui.services.ctaBody, typed)}
                    </p>
                    <div className="mt-5 space-y-2.5">
                      <a href={site.phoneHref} className="btn-primary w-full" dir="ltr">
                        <Phone className="h-4 w-4" strokeWidth={2.4} />
                        {site.phoneDisplay}
                      </a>
                      <Link href={localeHref(typed, 'contact')} className="btn-ghost-light w-full">
                        {t(ui.common.freeQuote, typed)}
                      </Link>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={140}>
                  <div className="mt-6">
                    <p className="text-[.72rem] font-extrabold uppercase tracking-[.14em] text-ink-500">
                      {t(ui.services.benefits, typed)}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {service.benefits.map((b, i) => (
                        <li
                          key={i}
                          className="rounded-full bg-slate-100 px-3.5 py-1.5 text-[.74rem] font-semibold text-ink-700"
                        >
                          {t(b, typed)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- scope */}
      <section className="section bg-slate-50/70">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t(ui.services.scope, typed)}
              title={t(service.title, typed)}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.scope.map((item, i) => (
              <Reveal key={i} delay={i * 60} className="h-full">
                <article className="card card-hover h-full p-6">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone.bg} ${tone.text}`}
                  >
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-[1rem] font-extrabold leading-snug text-brand-950">
                    {t(item.title, typed)}
                  </h3>
                  <p className="mt-3 text-[.86rem] leading-[1.85] text-ink-500">
                    {t(item.body, typed)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps locale={typed} />

      {/* ------------------------------------------------------------------ faq */}
      {faqItems.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <SectionHeading eyebrow={t(ui.services.faq, typed)} title={t(ui.services.faq, typed)} />
            </Reveal>
            <Reveal delay={80}>
              <div className="mx-auto mt-12 max-w-3xl">
                <Accordion items={faqItems} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- other services */}
      <section className="section bg-slate-50/70">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t(ui.common.otherServices, typed)}
              title={t(ui.common.otherServices, typed)}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {others.map((other, i) => {
              const otherTone = tones[other.tone];
              return (
                <Reveal key={other.slug} delay={i * 70} className="h-full">
                  <Link
                    href={localeHref(typed, `services/${other.slug}`)}
                    className="card card-hover flex h-full flex-col p-6"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${otherTone.bg} ${otherTone.text}`}
                    >
                      <Icon name={other.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-[1rem] font-extrabold text-brand-950">
                      {t(other.title, typed)}
                    </h3>
                    <p className="mt-3 flex-1 text-[.84rem] leading-[1.8] text-ink-500">
                      {t(other.short, typed)}
                    </p>
                    <span
                      className={`mt-5 inline-flex items-center gap-2 text-[.82rem] font-extrabold ${otherTone.text}`}
                    >
                      {t(ui.common.viewDetails, typed)}
                      <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand locale={typed} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
