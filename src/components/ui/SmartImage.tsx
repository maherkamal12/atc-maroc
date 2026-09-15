'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * Renders a raster asset through `next/image` (optimised, responsive) and an
 * SVG asset through a plain `<img>`, so we never have to relax
 * `images.dangerouslyAllowSVG`.
 *
 * If an asset is ever missing, the component degrades to a branded placeholder
 * instead of a broken-image icon — the layout keeps its exact dimensions.
 */
export function SmartImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes = '100vw',
  priority = false,
  className = '',
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const isSvg = src.toLowerCase().endsWith('.svg');

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={`${
          fill ? 'absolute inset-0' : 'block w-full'
        } flex items-center justify-center bg-gradient-to-br from-brand-900 via-brand-950 to-brand-900 ${className}`}
      >
        <span className="select-none font-sans text-[.72rem] font-black uppercase tracking-[.35em] text-accent-400/60">
          ATC
        </span>
      </span>
    );
  }

  if (isSvg) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={fill ? `absolute inset-0 h-full w-full ${className}` : className}
      />
    );
  }

  return fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={className}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
