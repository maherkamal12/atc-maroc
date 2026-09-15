'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export function Accordion({
  items,
  className = '',
}: {
  items: Array<{ q: string; a: string }>;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white ${className}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start transition hover:bg-slate-50/70 sm:px-7"
              >
                <span className="text-[.95rem] font-bold text-brand-950">{item.q}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                    isOpen ? 'bg-accent-500 text-brand-950' : 'bg-slate-100 text-brand-950'
                  }`}
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4" strokeWidth={2.8} />
                  ) : (
                    <Plus className="h-4 w-4" strokeWidth={2.8} />
                  )}
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-[.92rem] leading-[1.9] text-ink-500 sm:px-7">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
