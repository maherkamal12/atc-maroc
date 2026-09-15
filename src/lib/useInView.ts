'use client';

import { useEffect, useRef, useState } from 'react';

/** Tiny IntersectionObserver hook, shared by Reveal and CountUp. */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px', ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
