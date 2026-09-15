import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'start';
  tone?: 'light' | 'dark';
  children?: ReactNode;
}) {
  const centered = align === 'center';
  return (
    <div
      className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-start'}`}
    >
      {eyebrow && (
        <span className={tone === 'dark' ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</span>
      )}
      <h2
        className={`mt-5 max-w-3xl text-balance text-[1.75rem] font-extrabold leading-tight sm:text-[2.1rem] lg:text-[2.5rem] ${
          tone === 'dark' ? 'text-white' : 'text-brand-950'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-pretty text-[1rem] leading-[1.85] ${
            tone === 'dark' ? 'text-white/65' : 'text-ink-500'
          }`}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

/** Decorative amber rule used under some headings. */
export function HeadingRule({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`mt-6 block h-1 w-16 rounded-full ${
        tone === 'dark' ? 'bg-accent-400' : 'bg-accent-500'
      }`}
      aria-hidden="true"
    />
  );
}
