'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fades content up the first time it scrolls into view.
 * Falls back to plain visible content when IntersectionObserver is unavailable
 * or the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`transition-all duration-[750ms] ease-[cubic-bezier(.22,1,.36,1)] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
