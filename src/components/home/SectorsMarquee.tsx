import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { sectors } from '@/content/site';

export function SectorsMarquee({ locale }: { locale: Locale }) {
  // Duplicated so the CSS marquee loops seamlessly.
  const items = [...sectors, ...sectors];

  return (
    <section className="border-y border-slate-200 bg-white py-8">
      <p className="container mb-5 text-center text-[.72rem] font-extrabold uppercase tracking-[.18em] text-ink-500">
        {t(ui.marquee.title, locale)}
      </p>
      <div className="group relative overflow-hidden">
        <div
          className="flex w-max animate-marquee items-center gap-3 group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {items.map((sector, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-[.82rem] font-bold text-ink-700"
            >
              {t(sector, locale)}
            </span>
          ))}
        </div>
        {/* edge fades */}
        <span className="pointer-events-none absolute inset-y-0 start-0 w-20 bg-gradient-to-r from-white to-transparent rtl:bg-gradient-to-l" />
        <span className="pointer-events-none absolute inset-y-0 end-0 w-20 bg-gradient-to-l from-white to-transparent rtl:bg-gradient-to-r" />
      </div>
      <span className="sr-only">
        {sectors.map((s) => t(s, locale)).join(', ')}
      </span>
    </section>
  );
}
