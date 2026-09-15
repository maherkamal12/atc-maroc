import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function ProcessSteps({ locale }: { locale: Locale }) {
  const steps = ui.process.steps;

  return (
    <section className="section bg-white">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow={t(ui.process.eyebrow, locale)}
            title={t(ui.process.title, locale)}
            subtitle={t(ui.process.subtitle, locale)}
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-8 lg:grid-cols-5 lg:gap-5">
          {/* connector line on large screens */}
          <span
            className="absolute inset-x-[10%] top-7 hidden h-[2px] bg-gradient-to-r from-slate-200 via-accent-300 to-slate-200 lg:block"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 90} as="li" className="relative">
              <div className="flex flex-col items-start lg:items-center lg:text-center">
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-950 text-[1.05rem] font-black text-white shadow-[0_12px_30px_-12px_rgba(7,26,49,.7)] ring-4 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[1rem] font-extrabold leading-snug text-brand-950">
                  {t(step.title, locale)}
                </h3>
                <p className="mt-3 text-[.86rem] leading-[1.85] text-ink-500">
                  {t(step.body, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
