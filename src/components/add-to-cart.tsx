"use client";

import { useState } from "react";
import { useQuote } from "./cart-provider";

type Props = {
  product: {
    slug: string;
    nameAr: string;
    nameFr: string;
    image: string;
  };
  labels: { addToQuote: string; added: string; quantity: string };
};

export function AddToQuote({ product, labels }: Props) {
  const { add } = useQuote();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 rounded-full border border-slate-200 p-1">
        <button
          type="button"
          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          className="grid h-9 w-9 place-items-center rounded-full bg-slate-50 font-bold text-slate-600"
        >
          −
        </button>
        <span className="w-10 text-center text-sm font-bold">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((value) => Math.min(99, value + 1))}
          className="grid h-9 w-9 place-items-center rounded-full bg-slate-50 font-bold text-slate-600"
        >
          +
        </button>
      </div>
      <span className="text-xs font-semibold text-slate-500">{labels.quantity}</span>
      <button
        type="button"
        onClick={() => {
          add(product, quantity);
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
        className={`btn ${added ? "bg-emerald-600" : "btn-primary"}`}
      >
        {added ? `✓ ${labels.added}` : labels.addToQuote}
      </button>
    </div>
  );
}
