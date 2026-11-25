import Link from "next/link";
import { messages, type Locale } from "../../localization/messages";

export function PortfolioShell({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const alternateLocale = locale === "es" ? "en" : "es";

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <a className="sr-only focus:not-sr-only" href="#main">
        {copy.skipLink}
      </a>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-300 pb-5">
        <span className="font-semibold">Saül Portfolio</span>
        <nav aria-label={copy.languageLabel}>
          <Link
            className="inline-block rounded px-3 py-3 underline"
            href={`/${alternateLocale}`}
            hrefLang={alternateLocale}
            lang={alternateLocale}
          >
            {copy.alternateLanguage}
          </Link>
        </nav>
      </header>
      <main id="main" tabIndex={-1} className="py-16">
        <h1 className="text-3xl font-bold sm:text-5xl">{copy.heading}</h1>
        <p className="mt-4 text-lg">{copy.description}</p>
      </main>
    </div>
  );
}
