export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const messages = {
  es: {
    heading: "Portfolio en desarrollo",
    description: "Esta es la base técnica del portfolio.",
    languageLabel: "Idioma",
    alternateLanguage: "English",
    skipLink: "Saltar al contenido",
  },
  en: {
    heading: "Portfolio in development",
    description: "This is the technical foundation of the portfolio.",
    languageLabel: "Language",
    alternateLanguage: "Español",
    skipLink: "Skip to content",
  },
} satisfies Record<Locale, Record<string, string>>;
