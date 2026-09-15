'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { testimonials } from '@/content/site';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Testimonials({ locale }: { locale: Locale }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [go, paused]);

  // Show three cards on wide screens, sliding one at a time.
  const visible = [0, 1, 2].map((offset) => testimonials[(index + offset) % total]);

  return (
    <section
      className="section bg-slate-50/70"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={t(ui.testimonials.eyebrow, locale)}
            title={t(ui.testimonials.title, locale)}
            subtitle={t(ui.testimonials.subtitle, locale)}
            align="start"
          />
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t(ui.common.back, locale)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-950 transition hover:-translate-y-0.5 hover:border-brand-300"
            >
              <ChevronRight className="h-5 w-5 rtl-flip" strokeWidth={2.4} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t(ui.common.readMore, locale)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-950 text-white transition hover:-translate-y-0.5 hover:bg-accent-500 hover:text-brand-950"
            >
              <ChevronLeft className="h-5 w-5 rtl-flip" strokeWidth={2.4} />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {visible.map((item, i) => (
            <figure
              key={`${item.name.fr}-${index}-${i}`}
              className={`card flex h-full flex-col p-7 transition-all duration-500 ${
                i === 1 ? 'lg:-translate-y-2 lg:shadow-card' : ''
              }`}
            >
              <Quote className="h-8 w-8 text-accent-500" strokeWidth={2} />
              <blockquote className="mt-5 flex-1 text-[.92rem] leading-[1.95] text-ink-700">
                “{t(item.quote, locale)}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-950 text-[.85rem] font-black text-accent-400">
                  {t(item.name, locale).charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[.9rem] font-extrabold text-brand-950">
                    {t(item.name, locale)}
                  </span>
                  <span className="block truncate text-[.78rem] text-ink-500">
                    {t(item.role, locale)}
                  </span>
                </span>
                <span className="ms-auto flex shrink-0 gap-0.5" aria-label={`${item.rating}/5`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-9 flex justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={t(item.name, locale)}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t(item.name, locale)}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-accent-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
