"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type Slide = {
  image: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[560px] w-full overflow-hidden bg-brand-950 md:h-[640px]">
      {slides.map((slide, position) => (
        <div
          key={slide.image + position}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            position === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={position !== index}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt=""
            className={`h-full w-full object-cover ${position === index ? "hero-slide" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-brand-950/25" />
          <div className="absolute inset-0">
            <div className="wrap flex h-full flex-col justify-center">
              <div className="max-w-2xl text-white">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-300 backdrop-blur">
                  ATLAS TECH CONCEPT · TANGER
                </p>
                <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{slide.title}</h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-lg">
                  {slide.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={slide.ctaHref} className="btn btn-primary">
                    {slide.ctaLabel}
                  </Link>
                  <Link href={slide.secondaryHref} className="btn btn-outline">
                    {slide.secondaryLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 start-0 end-0 z-10">
        <div className="wrap flex items-center gap-2">
          {slides.map((slide, position) => (
            <button
              key={`dot-${position}`}
              type="button"
              onClick={() => setIndex(position)}
              aria-label={`slide ${position + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                position === index ? "w-10 bg-accent-500" : "w-5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
