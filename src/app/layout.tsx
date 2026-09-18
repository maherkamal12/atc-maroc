import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ATLAS TECH CONCEPT | حلول تقنية متكاملة للمباني",
    template: "%s | ATLAS TECH CONCEPT",
  },
  description:
    "أطلس تك كونسيبت: كهرباء، سباكة، تدفئة مركزية، تكييف وتهوية، طاقة شمسية وتصميم داخلي في طنجة والمغرب. ATLAS TECH CONCEPT : électricité, plomberie, chauffage, climatisation, solaire et design intérieur au Maroc.",
  keywords: [
    "ATC Maroc",
    "Atlas Tech Concept",
    "كهرباء طنجة",
    "طاقة شمسية المغرب",
    "plomberie Tanger",
    "climatisation Maroc",
    "énergie solaire Maroc",
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerList = await headers();
  const locale = headerList.get("x-locale") === "fr" ? "fr" : "ar";

  return (
    <html lang={locale} dir={locale === "fr" ? "ltr" : "rtl"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#081b3d" />
      </head>
      <body className="bg-white text-slate-800 antialiased">{children}</body>
    </html>
  );
}
