export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

type Messages = {
  heading: string;
  description: string;
  languageLabel: string;
  alternateLanguage: string;
  skipLink: string;
  navigationLabel: string;
  home: string;
  footer: string;
  themeLabel: string;
  themeOptions: Record<"system" | "light" | "dark", string>;
};

export const messages = {
  es: {
    heading: "Portfolio en desarrollo",
    description: "Esta es la base técnica del portfolio.",
    languageLabel: "Idioma",
    alternateLanguage: "English",
    skipLink: "Saltar al contenido",
    navigationLabel: "Navegación principal",
    home: "Inicio",
    footer: "Portfolio en desarrollo",
    themeLabel: "Tema",
    themeOptions: { system: "Sistema", light: "Claro", dark: "Oscuro" },
  },
  en: {
    heading: "Portfolio in development",
    description: "This is the technical foundation of the portfolio.",
    languageLabel: "Language",
    alternateLanguage: "Español",
    skipLink: "Skip to content",
    navigationLabel: "Main navigation",
    home: "Home",
    footer: "Portfolio in development",
    themeLabel: "Theme",
    themeOptions: { system: "System", light: "Light", dark: "Dark" },
  },
} satisfies Record<Locale, Messages>;
