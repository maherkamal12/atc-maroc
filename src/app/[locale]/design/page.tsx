import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Palette, Sofa, SunMedium } from 'lucide-react';
import { isLocale, localeHref, t, type Locale } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { designGallery, designStyles } from '@/content/site';
import { services } from '@/content/services';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { CtaBand } from '@/components/home/CtaBand';
import { Icon } from '@/components/ui/Icon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(ui.nav.design, locale),
    description: t(ui.design.subtitle, locale),
    alternates: {
      canonical: `/${locale}/design`,
      languages: { ar: '/ar/design', fr: '/fr/design', 'x-default': '/ar/design' },
    },
  };
}

export default async function DesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;

  const finishing = services.find((s) => s.slug === 'amenagement-interieur')!;
  const pillars = [
    { icon: Palette, title: ui.design.step1, body: ui.design.step1Body },
    { icon: Sofa, title: ui.design.step2, body: ui.design.step2Body },
    { icon: SunMedium, title: ui.design.step3, body: ui.design.step3Body },
  ];

  return (
    <>
      <PageHero
        locale={typed}
        eyebrow={t(ui.design.eyebrow, typed)}
        title={t(ui.design.title, typed)}
        subtitle={t(ui.design.subtitle, typed)}
        crumbs={[{ label: t(ui.nav.design, typed) }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href={localeHref(typed, 'contact')} className="btn-primary !py-3">
            {t(ui.common.freeQuote, typed)}
            <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
          </Link>
          <Link
            href={localeHref(typed, 'services/amenagement-interieur')}
            className="btn-ghost-light !py-3"
          >
            {t(finishing.title, typed)}
          </Link>
        </div>
      </PageHero>

      {/* --------------------------------------------------------------- pillars */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, i) => {
              const IconCmp = pillar.icon;
              return (
                <Reveal key={i} delay={i * 80} className="h-full">
                  <article className="card card-hover h-full p-7">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-brand-950">
                      <IconCmp className="h-7 w-7" strokeWidth={2} />
                    </span>
                    <h2 className="mt-6 text-[1.1rem] font-extrabold text-brand-950">
                      {t(pillar.title, typed)}
                    </h2>
                    <p className="mt-4 text-[.9rem] leading-[1.9] text-ink-500">
                      {t(pillar.body, typed)}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- gallery */}
      <section className="section bg-slate-50/70">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t(ui.design.eyebrow, typed)}
              title={t(ui.design.gallery, typed)}
              subtitle={t(ui.design.subtitle, typed)}
            />
          </Reveal>

          <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
            {designGallery.map((tile, i) => (
              <Reveal
                key={tile.src}
                delay={i * 60}
                className={
                  tile.span === 'wide'
                    ? 'col-span-2'
                    : tile.span === 'tall'
                      ? 'row-span-2'
                      : 'col-span-1'
                }
              >
                <figure className="group relative h-full overflow-hidden rounded-3xl bg-brand-950 shadow-soft">
                  <SmartImage
                    src={tile.src}
                    alt={t(tile.title, typed)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-brand-950/88 via-brand-950/10 to-transparent" />
                  <figcaption className="absolute inset-x-5 bottom-5">
                    <p className="text-[.95rem] font-extrabold leading-snug text-white">
                      {t(tile.title, typed)}
                    </p>
                    <p className="mt-1.5 text-[.75rem] font-semibold text-white/60">
                      {t(tile.place, typed)}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- styles */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow={t(ui.design.styles, typed)}
              title={t(ui.design.styles, typed)}
              subtitle={t(ui.design.subtitle, typed)}
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {designStyles.map((style, i) => (
              <Reveal key={i} delay={i * 70} className="h-full">
                <article className="h-full rounded-3xl border border-slate-200 bg-slate-50/60 p-6">
                  <h3 className="text-[1rem] font-extrabold text-brand-950">
                    {t(style.name, typed)}
                  </h3>
                  <p className="mt-3 text-[.85rem] leading-[1.85] text-ink-500">
                    {t(style.body, typed)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- finishing service */}
      <section className="section bg-slate-50/70">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Reveal>
                <figure className="relative overflow-hidden rounded-4xl shadow-lift">
                  <div className="relative aspect-[4/3]">
                    <SmartImage
                      src={finishing.image}
                      alt={t(finishing.title, typed)}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal>
                <SectionHeading
                  eyebrow={t(ui.services.eyebrow, typed)}
                  title={t(finishing.title, typed)}
                  subtitle={t(finishing.intro, typed)}
                  align="start"
                />
              </Reveal>
              <ul className="mt-8 space-y-3">
                {finishing.scope.map((item, i) => (
                  <Reveal key={i} delay={i * 55} as="li">
                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                        <Icon name={item.icon} className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                      <span>
                        <span className="block text-[.88rem] font-bold text-brand-950">
                          {t(item.title, typed)}
                        </span>
                        <span className="mt-1 block text-[.8rem] leading-relaxed text-ink-500">
                          {t(item.body, typed)}
                        </span>
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={200}>
                <Link
                  href={localeHref(typed, 'services/amenagement-interieur')}
                  className="btn-dark mt-8 !px-7 !py-3.5"
                >
                  {t(ui.common.viewDetails, typed)}
                  <ArrowRight className="rtl-flip h-4 w-4" strokeWidth={2.6} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps locale={typed} />
      <CtaBand locale={typed} />
    </>
  );
}
