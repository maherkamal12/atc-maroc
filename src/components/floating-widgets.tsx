"use client";

import { useEffect, useState } from "react";
import { site, type Locale } from "@/lib/site";

export function FloatingWidgets({
  locale,
  labels,
}: {
  locale: Locale;
  labels: { whatsapp: string; cookieText: string; cookieMore: string; cookieAccept: string };
}) {
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem("atc-cookies");
    if (!accepted) {
      const timer = setTimeout(() => setShowCookies(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem("atc-cookies", "1");
    setShowCookies(false);
  };

  const message =
    locale === "fr"
      ? "Bonjour ATC, je souhaite un devis pour un projet."
      : "مرحباً، أرغب في الحصول على عرض سعر لمشروع.";

  return (
    <>
      <a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 end-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.9)] transition hover:scale-105"
        aria-label={labels.whatsapp}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.02c0-5.19 4.23-9.41 9.42-9.41 2.52 0 4.88.98 6.65 2.76a9.34 9.34 0 0 1 2.76 6.66c0 5.19-4.23 9.42-9.42 9.42M20.5 3.5A11.3 11.3 0 0 0 12.05 0C5.8 0 .72 5.08.72 11.32c0 1.99.52 3.94 1.51 5.66L0 24l7.18-1.88a11.3 11.3 0 0 0 4.87 1.11h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01" />
        </svg>
        <span className="hidden sm:inline">{labels.whatsapp}</span>
      </a>

      {showCookies && (
        <div className="fixed bottom-5 start-5 z-40 hidden max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl md:block">
          <p className="text-xs leading-relaxed text-slate-600">{labels.cookieText}</p>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={accept}
              className="rounded-full bg-brand-900 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-brand-800"
            >
              {labels.cookieAccept}
            </button>
            <span className="text-xs font-semibold text-brand-700 underline">{labels.cookieMore}</span>
          </div>
        </div>
      )}
    </>
  );
}
