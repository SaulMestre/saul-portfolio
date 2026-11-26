import { messages, type Locale } from "../../localization/messages";
import { Container } from "./container";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-divider py-6 text-sm text-ink-muted">
      <Container>{messages[locale].footer}</Container>
    </footer>
  );
}
