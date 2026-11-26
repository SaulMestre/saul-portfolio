import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteLayout } from "../../components/layout/site-layout";
import { ThemeBootstrap } from "../../components/theme/theme-bootstrap";
import { isLocale, locales, messages } from "../../localization/messages";
import "../globals.css";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return {
    title: messages[locale].heading,
    description: messages[locale].description,
    robots: { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeBootstrap />
      </head>
      <body>
        <SiteLayout locale={locale}>{children}</SiteLayout>
      </body>
    </html>
  );
}
