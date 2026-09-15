export const locales = ['ar', 'fr'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

export const localeConfig: Record<
  Locale,
  {
    label: string;
    englishLabel: string;
    dir: 'rtl' | 'ltr';
    htmlLang: string;
    /** BCP-47 tag used for Intl formatting */
    intl: string;
  }
> = {
  ar: {
    label: 'العربية',
    englishLabel: 'Arabic',
    dir: 'rtl',
    htmlLang: 'ar',
    intl: 'ar-MA',
  },
  fr: {
    label: 'Français',
    englishLabel: 'French',
    dir: 'ltr',
    htmlLang: 'fr',
    intl: 'fr-MA',
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale) {
  return localeConfig[locale].dir;
}

/** A string that exists in every supported language. */
export type Localized = Record<Locale, string>;

/** Resolve a localized value for a locale. */
export function t(value: Localized, locale: Locale): string {
  return value[locale];
}

/** Pick the "other" locale, used by the language switcher. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'fr' : 'ar';
}

/**
 * Build a locale-aware href. Every route lives under `/{locale}/...`,
 * so links stay language-consistent while navigating.
 */
export function localeHref(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/** Format a number using the locale's conventions (keeps Latin digits for readability). */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-MA-u-nu-latn' : 'fr-MA').format(value);
}
