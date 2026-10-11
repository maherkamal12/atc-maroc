"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Keep the document direction in sync when the locale changes client-side. */
export function LocaleDirectionSync() {
  const pathname = usePathname() || "/ar";

  useEffect(() => {
    const locale = pathname.split("/")[1] || "ar";
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [pathname]);

  return null;
}
