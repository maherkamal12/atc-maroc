"use client";

import { useEffect, useMemo, useState } from "react";
import { placeholderForCategory, resolveImage } from "@/lib/images";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | null;
  fallbackSrc?: string;
  categorySlug?: string | null;
};

/**
 * Drop-in replacement for <img> that never shows a broken-image icon or raw alt-text.
 *
 * - Normalizes legacy `https://atc-maroc.com/wp-content/uploads/...` URLs via `resolveImage`
 *   (to `LEGACY_IMAGE_BASE` if configured, or to `/wp-content/uploads/...` handled by our
 *   App Router endpoint).
 * - If any network or upstream error occurs, swaps to a local SVG placeholder on `onError`.
 */
export function SafeImage({
  src,
  fallbackSrc,
  categorySlug,
  alt,
  onError,
  ...rest
}: Props) {
  const fallback =
    fallbackSrc ??
    (categorySlug ? placeholderForCategory(categorySlug) : "/placeholders/product-generic.svg");

  const resolved = useMemo(
    () => resolveImage(src, { categorySlug, fallback }),
    [src, categorySlug, fallback],
  );

  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  useEffect(() => {
    setFailedSrc(null);
  }, [resolved]);

  const activeSrc = failedSrc === resolved ? fallback : resolved;

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (failedSrc !== resolved) {
      setFailedSrc(resolved);
    }
    onError?.(e);
  };

  // eslint-disable-next-line @next/next/no-img-element
  return <img {...rest} src={activeSrc} alt={alt ?? ""} onError={handleError} />;
}

export function safeImageSrc(
  src: string | null | undefined,
  opts?: { categorySlug?: string | null; fallback?: string },
) {
  return resolveImage(src ?? "", opts);
}
