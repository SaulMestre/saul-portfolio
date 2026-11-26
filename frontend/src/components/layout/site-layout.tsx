import type { ReactNode } from "react";
import { messages, type Locale } from "../../localization/messages";
import { Container } from "./container";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteLayout({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a className="ui-skip-link" href="#main">
        {messages[locale].skipLink}
      </a>
      <SiteHeader locale={locale} />
      <main id="main" tabIndex={-1} className="flex-1 py-16">
        <Container>{children}</Container>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
