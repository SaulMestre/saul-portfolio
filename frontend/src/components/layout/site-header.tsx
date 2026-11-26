import { messages, type Locale } from "../../localization/messages";
import { ActionLink } from "../ui/action-link";
import { ThemeSelector } from "../theme/theme-selector";
import { Container } from "./container";

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = messages[locale];
  const alternateLocale = locale === "es" ? "en" : "es";

  return (
    <header className="border-b border-divider">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <span className="text-lg font-semibold">Saül Portfolio</span>
          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label={copy.navigationLabel}>
              <ActionLink href={`/${locale}`} variant="ghost" aria-current="page">
                {copy.home}
              </ActionLink>
            </nav>
            <nav aria-label={copy.languageLabel}>
              <ActionLink
                variant="outline"
                documentNavigation
                href={`/${alternateLocale}`}
                hrefLang={alternateLocale}
                lang={alternateLocale}
              >
                {copy.alternateLanguage}
              </ActionLink>
            </nav>
            <ThemeSelector locale={locale} />
          </div>
        </div>
      </Container>
    </header>
  );
}
