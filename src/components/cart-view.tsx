"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuote } from "./cart-provider";
import type { Locale } from "@/lib/site";

type Labels = {
  cartEmpty: string;
  backToShop: string;
  yourCart: string;
  product: string;
  quantity: string;
  subtotal: string;
  remove: string;
  clearCart: string;
  orderForm: string;
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  city: string;
  addressField: string;
  note: string;
  placeOrder: string;
  placing: string;
  orderSuccess: string;
  orderRef: string;
  orderSuccessText: string;
  continueShopping: string;
  requiredField: string;
  invalidEmail: string;
  errorMsg: string;
  priceOnRequest: string;
};

export function QuoteView({ locale, labels }: { locale: Locale; labels: Labels }) {
  const { items, count, ready, setQuantity, remove, clear } = useQuote();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState("");

  const name = (item: { nameAr: string; nameFr: string; slug: string }) =>
    (locale === "fr" ? item.nameFr : item.nameAr) || item.slug;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customerName = String(data.get("customerName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!customerName) nextErrors.customerName = labels.requiredField;
    if (!email) nextErrors.email = labels.requiredField;
    else if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) nextErrors.email = labels.invalidEmail;
    if (!phone) nextErrors.phone = labels.requiredField;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setState("loading");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          city: String(data.get("city") ?? ""),
          address: String(data.get("address") ?? ""),
          note: String(data.get("note") ?? ""),
          locale,
          items: items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
        }),
      });
      if (!response.ok) throw new Error("failed");
      const payload = (await response.json()) as { reference: string };
      setReference(payload.reference);
      setState("done");
      clear();
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-3xl text-white">
          ✓
        </div>
        <h2 className="text-2xl font-extrabold text-emerald-900">{labels.orderSuccess}</h2>
        <p className="mt-2 text-sm text-emerald-800">{labels.orderSuccessText}</p>
        {reference && (
          <p className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-900">
            {labels.orderRef}: {reference}
          </p>
        )}
        <div className="mt-6">
          <Link href={`/${locale}/products`} className="btn btn-dark">
            {labels.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  if (!ready) {
    return <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />;
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <div className="mb-4 text-5xl">📝</div>
        <p className="text-lg font-bold text-brand-950">{labels.cartEmpty}</p>
        <Link href={`/${locale}/products`} className="btn btn-primary mt-6">
          {labels.backToShop}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="hidden grid-cols-[2fr_1fr_auto] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold uppercase text-slate-500 md:grid">
            <span>{labels.product}</span>
            <span>{labels.quantity}</span>
            <span />
          </div>
          {items.map((item) => (
            <div
              key={item.slug}
              className="grid grid-cols-1 gap-4 border-b border-slate-100 p-5 last:border-0 md:grid-cols-[2fr_1fr_auto] md:items-center"
            >
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  className="h-16 w-16 rounded-lg bg-white object-contain p-1 ring-1 ring-slate-100"
                />
                <div>
                  <Link
                    href={`/${locale}/products/${item.slug}`}
                    className="text-sm font-extrabold text-brand-950 hover:text-accent-600"
                  >
                    {name(item)}
                  </Link>
                  <span className="mt-0.5 block text-[11px] font-bold text-brand-500">
                    {labels.priceOnRequest}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(item.slug)}
                    className="mt-1 block text-xs font-semibold text-red-500 hover:underline"
                  >
                    {labels.remove}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(item.slug, item.quantity - 1)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(item.slug, item.quantity + 1)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
                >
                  +
                </button>
              </div>
              <span />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-sm font-bold text-slate-500 underline hover:text-red-600"
        >
          {labels.clearCart}
        </button>

        <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-extrabold text-brand-950">{labels.orderForm}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-950">{labels.yourName} *</label>
              <input name="customerName" className="field" />
              {errors.customerName && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.customerName}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-950">{labels.yourEmail} *</label>
              <input name="email" type="email" className="field" />
              {errors.email && <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-950">{labels.yourPhone} *</label>
              <input name="phone" className="field" />
              {errors.phone && <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold text-brand-950">{labels.city}</label>
              <input name="city" className="field" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-bold text-brand-950">{labels.addressField}</label>
              <input name="address" className="field" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-bold text-brand-950">{labels.note}</label>
              <textarea name="note" rows={3} className="field resize-y" />
            </div>
          </div>
          <button
            type="submit"
            disabled={state === "loading"}
            className="btn btn-primary mt-6 disabled:opacity-70"
          >
            {state === "loading" ? labels.placing : labels.placeOrder}
          </button>
          {state === "error" && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">
              {labels.errorMsg}
            </p>
          )}
        </form>
      </div>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-32">
        <h3 className="text-lg font-extrabold text-brand-950">{labels.yourCart}</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>{labels.subtotal}</span>
            <span className="font-bold text-brand-900">{count}</span>
          </div>
        </div>
        <p className="mt-4 rounded-lg bg-brand-50 p-3 text-xs leading-relaxed text-brand-800">
          {locale === "fr"
            ? "Les prix ne sont pas affichés sur le site. Envoyez votre liste de produits et un conseiller vous transmettra un devis détaillé (matériel, livraison et pose)."
            : "لا تُعرض الأسعار في الموقع. أرسل قائمة المنتجات التي تحتاجها وسيتواصل معك أحد مستشارينا بعرض سعر مفصل (المواد، التوصيل والتركيب)."}
        </p>
      </aside>
    </div>
  );
}
