'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/lib/useInView';

/**
 * Counts up to `value` the first time it scrolls into view.
 * Renders the final value immediately for reduced-motion visitors.
 */
export function CountUp({
  value,
  suffix = '',
  duration = 1600,
  className = '',
  localeAr = false,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  localeAr?: boolean;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo for a snappy finish
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  const formatted = new Intl.NumberFormat(localeAr ? 'ar-MA-u-nu-latn' : 'fr-MA').format(display);

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
