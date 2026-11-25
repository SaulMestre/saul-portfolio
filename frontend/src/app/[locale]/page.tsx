import { notFound } from "next/navigation";
import { isLocale } from "../../localization/messages";
import { PortfolioShell } from "../../features/shell/portfolio-shell";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <PortfolioShell locale={locale} />;
}
