import { messages, type Locale } from "../../localization/messages";

export function PortfolioShell({ locale }: { locale: Locale }) {
  const copy = messages[locale];

  return (
    <>
      <h1 className="text-3xl font-bold sm:text-5xl">{copy.heading}</h1>
      <p className="mt-4 text-lg text-ink-muted">{copy.description}</p>
    </>
  );
}
