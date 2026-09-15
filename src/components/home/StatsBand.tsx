import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { site } from '@/content/site';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';

export function StatsBand({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent-500 via-accent-500 to-accent-600 py-14">
      <div
        className="absolute inset-0 opacity-[.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(7,26,49,.9) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />
      <div className="container relative">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat, i) => (
            <Reveal key={t(stat.label, locale)} delay={i * 80}>
              <div className="text-center lg:text-start">
                <p className="text-[2.6rem] font-black leading-none text-brand-950 sm:text-[3rem]">
                  <CountUp value={stat.value} suffix={stat.suffix} localeAr={locale === 'ar'} />
                </p>
                <p className="mt-3 text-[.85rem] font-bold uppercase tracking-[.1em] text-brand-950/70">
                  {t(stat.label, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
