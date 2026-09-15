import Link from 'next/link';
import { Award, Check, Layers3, Gauge, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { localeHref, t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const pillarIcons = [Layers3, ShieldCheck, Gauge];

export function WhyUs({ locale }: { locale: Locale }) {
  const pillars = [
    { title: ui.why.card1Title, body: ui.why.card1Body },
    { title: ui.why.card2Title, body: ui.why.card2Body },
    { title: ui.why.card3Title, body: ui.why.card3Body },
  ];

  return (
    <section className="section relative overflow-hidden bg-brand-950">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-24 start-[-6rem] h-96 w-96 rounded-full bg-brand-500/20 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-6rem] end-[-4rem] h-80 w-80 rounded-full bg-accent-500/12 blur-[90px]"
        aria-hidden="true"
      />

      <div className="container relative">
        <Reveal>
          <SectionHeading
            eyebrow={t(ui.why.eyebrow, locale)}
            title={t(ui.why.title, locale)}
            subtitle={t(ui.why.subtitle, locale)}
            tone="dark"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const IconCmp = pillarIcons[i];
            return (
              <Reveal key={i} delay={i * 100} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[.05] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-400/40 hover:bg-white/[.09]">
                  <span className="absolute end-6 top-6 text-[3.4rem] font-black leading-none text-white/[.05]">
                    0{i + 1}
                  </span>

                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-brand-950 shadow-[0_10px_30px_-10px_rgba(245,166,35,.7)]">
                    <IconCmp className="h-7 w-7" strokeWidth={2} />
                  </span>

                  <h3 className="mt-6 text-[1.15rem] font-extrabold text-white">
                    {t(pillar.title, locale)}
                  </h3>
                  <p className="mt-4 text-[.9rem] leading-[1.9] text-white/60">
                    {t(pillar.body, locale)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* feature pills + CTA */}
        <Reveal delay={150}>
          <div className="mt-14 flex flex-col items-center gap-8 rounded-4xl border border-white/10 bg-white/[.04] p-8 backdrop-blur-sm lg:flex-row lg:justify-between lg:p-10">
            <ul className="grid flex-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {ui.why.features.map((feature) => (
                <li
                  key={t(feature, locale)}
                  className="inline-flex items-center gap-3 text-[.88rem] font-semibold text-white/80"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                    <Check className="h-3.5 w-3.5" strokeWidth={3.2} />
                  </span>
                  {t(feature, locale)}
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href={localeHref(locale, 'contact')} className="btn-primary">
                <Award className="h-4 w-4" strokeWidth={2.4} />
                {t(ui.common.requestQuote, locale)}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
