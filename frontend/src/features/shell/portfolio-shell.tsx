import { Container } from "../../components/layout/container";
import { ActionLink } from "../../components/ui/action-link";
import { messages, type Locale } from "../../localization/messages";

export function PortfolioShell({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const alternateLocale = locale === "es" ? "en" : "es";

  return (
    <Container>
      <div className="min-h-screen py-10">
        <a className="sr-only focus:not-sr-only" href="#main">
          {copy.skipLink}
        </a>
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-divider pb-5">
          <span className="font-semibold">Saül Portfolio</span>
          <nav aria-label={copy.languageLabel}>
            <ActionLink
              variant="outline"
              href={`/${alternateLocale}`}
              hrefLang={alternateLocale}
              lang={alternateLocale}
            >
              {copy.alternateLanguage}
            </ActionLink>
          </nav>
        </header>
        <main id="main" tabIndex={-1} className="py-16">
          <h1 className="text-3xl font-bold sm:text-5xl">{copy.heading}</h1>
          <p className="mt-4 text-lg text-ink-muted">{copy.description}</p>
        </main>
      </div>
    </Container>
  );
}
