import { notFound } from "next/navigation";
import { ComponentShowcase } from "../../../features/design-system/component-showcase";
import { isLocale } from "../../../localization/messages";

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <ComponentShowcase locale={locale} />;
}
