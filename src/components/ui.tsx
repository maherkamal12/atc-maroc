import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  light?: boolean;
}) {
  return (
    <div className={`mb-10 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && (
        <span
          className={`mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] ${
            light ? "text-accent-400" : "text-accent-600"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl font-extrabold leading-tight md:text-4xl ${
          light ? "text-white" : "text-brand-950"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-sm leading-relaxed md:text-base ${light ? "text-white/70" : "text-slate-600"}`}>
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-accent-500 to-accent-400 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  image,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs: { href?: string; label: string }[];
  image: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-900/60" />
      <div className="wrap relative py-14 md:py-20">
        <h1 className="text-3xl font-extrabold text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-sm text-white/75 md:text-lg">{subtitle}</p>}
        <nav className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className="font-semibold transition hover:text-accent-400">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-accent-400">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span aria-hidden>/</span>}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
      {children}
    </span>
  );
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="text-accent-500" aria-label={`${count}/5`}>
      {"★".repeat(count)}
    </span>
  );
}
