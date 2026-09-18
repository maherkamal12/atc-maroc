export const locales = ["ar", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ar" || value === "fr";
}

export function normalizeLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "fr" : "ar";
}

export const site = {
  nameAr: "أطلس تك كونسيبت",
  nameFr: "ATLAS TECH CONCEPT",
  shortName: "ATC",
  taglineAr: "حلول تقنية متكاملة للمباني",
  taglineFr: "Solutions techniques intégrées pour le bâtiment",
  email: "info@atc-maroc.com",
  phone: "00212780891026",
  phoneDisplay: "+212 780 891 026",
  whatsapp: "212780891026",
  instagram: "https://www.instagram.com/atc.maroc/",
  addressAr:
    "شارع مولاي اسماعيل، اقامة مولاي اسماعيل رقم 22، الطابق 5، رقم 19، طنجة 90000، المغرب",
  addressFr:
    "Avenue Moulay Smaïl, Rés. Moulay Ismaïl N°22, 5ème étage N°19, 90000 Tanger, Maroc",
  hours: [
    { ar: "الإثنين - الجمعة: 10:00 - 18:00", fr: "Lundi - Vendredi : 10h00 - 18h00" },
    { ar: "السبت: 08:00 - 18:00", fr: "Samedi : 08h00 - 18h00" },
    { ar: "الأحد: 09:00 - 17:00", fr: "Dimanche : 09h00 - 17h00" },
  ],
  mapUrl:
    "https://maps.google.com/?q=AVENUE+MOULAY+SMAIL+RES+MOULAY+ISMAIL+N%C2%B022+ETG+5+N%C2%B019,+90000+Tanger",
} as const;

export type NavLink = {
  href: string;
  labelAr: string;
  labelFr: string;
  children?: { href: string; labelAr: string; labelFr: string }[];
};

export const serviceNav: NavLink[] = [
  { href: "/services/electricite", labelAr: "الكهرباء", labelFr: "Électricité" },
  { href: "/services/plomberie", labelAr: "السباكة والمياه", labelFr: "Plomberie et réseaux d'eau" },
  { href: "/services/chauffage", labelAr: "التدفئة المركزية", labelFr: "Chauffage central" },
  { href: "/services/climatisation", labelAr: "التكييف والتهوية", labelFr: "Climatisation et ventilation" },
  { href: "/services/solaire", labelAr: "الطاقة الشمسية", labelFr: "Énergie solaire" },
  {
    href: "/services/amenagement",
    labelAr: "التجهيز الداخلي والتشطيب",
    labelFr: "Aménagement intérieur et finition",
  },
];

export const productNav: NavLink[] = [
  { href: "/products?category=panneaux-solaires", labelAr: "الألواح الشمسية", labelFr: "Panneaux solaires" },
  { href: "/products?category=onduleurs", labelAr: "المحولات (العواكس)", labelFr: "Onduleurs" },
  { href: "/products?category=batteries", labelAr: "البطاريات", labelFr: "Batteries" },
  { href: "/products?category=regulateurs-charge", labelAr: "وحدات التحكم في الشحن", labelFr: "Régulateurs de charge" },
  { href: "/products?category=pompes-solaires", labelAr: "المضخات الغاطسة الشمسية", labelFr: "Pompes immergées solaires" },
  { href: "/products?category=equipements-solaires", labelAr: "معدات وهياكل التثبيت", labelFr: "Équipements & structures" },
  { href: "/products?category=chauffage", labelAr: "التدفئة: مراجل ومشعات", labelFr: "Chauffage : chaudières & radiateurs" },
];

export const navLinks: NavLink[] = [
  { href: "/", labelAr: "الرئيسية", labelFr: "Accueil" },
  { href: "/about", labelAr: "من نحن", labelFr: "À propos de nous" },
  {
    href: "/services",
    labelAr: "الخدمات",
    labelFr: "Services",
    children: serviceNav,
  },
  {
    href: "/products",
    labelAr: "المنتجات",
    labelFr: "Produits",
    children: productNav,
  },
  { href: "/blog", labelAr: "المدونة", labelFr: "Blog" },
  { href: "/design", labelAr: "التصميم والتزيين", labelFr: "Design et décoration" },
  { href: "/contact", labelAr: "اتصل بنا", labelFr: "Contactez-nous" },
];

export function localizedPath(locale: Locale, href: string): string {
  const clean = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}


export function formatDate(date: Date | string, locale: Locale): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : "fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
