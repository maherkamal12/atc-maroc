"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuote } from "./cart-provider";
import type { Locale } from "@/lib/site";

export type ProductCardData = {
  slug: string;
  name: string;
  nameAr: string;
  nameFr: string;
  description: string;
  image: string;
  brand: string;
  inStock: boolean;
};

export function ProductCard({
  product,
  locale,
  labels,
}: {
  product: ProductCardData;
  locale: Locale;
  labels: { addToQuote: string; added: string; outOfStock: string; priceOnRequest: string };
}) {
  const { add } = useQuote();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add({
      slug: product.slug,
      nameAr: product.nameAr,
      nameFr: product.nameFr,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="card group flex flex-col">
      <Link href={`/${locale}/products/${product.slug}`} className="relative block overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full bg-white object-contain p-3 transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {!product.inStock && (
          <span className="absolute top-3 end-3 rounded-full bg-slate-900/85 px-2.5 py-1 text-xs font-bold text-white">
            {labels.outOfStock}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">
          {product.brand}
        </span>
        <Link
          href={`/${locale}/products/${product.slug}`}
          className="mt-1 line-clamp-2-custom text-[15px] font-extrabold text-brand-950 hover:text-accent-600"
        >
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2-custom text-[13px] leading-relaxed text-slate-500">
          {product.description}
        </p>
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700">
          💬 {labels.priceOnRequest}
        </span>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="text-xs font-bold text-brand-700 underline hover:text-accent-600"
          >
            {locale === "fr" ? "Détails" : "التفاصيل"}
          </Link>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`rounded-full px-4 py-2 text-xs font-bold text-white transition ${
              added ? "bg-emerald-600" : "bg-brand-900 hover:bg-accent-600"
            } disabled:cursor-not-allowed disabled:bg-slate-300`}
          >
            {added ? `✓ ${labels.added}` : labels.addToQuote}
          </button>
        </div>
      </div>
    </div>
  );
}
