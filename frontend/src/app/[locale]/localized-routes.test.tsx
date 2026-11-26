import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import LocaleLayout, { generateMetadata, generateStaticParams } from "./layout";
import HomePage from "./page";

afterEach(cleanup);

const params = (locale: string) => Promise.resolve({ locale });

describe("Localized routes", () => {
  it("generates both supported routes", () => {
    expect(generateStaticParams()).toEqual([{ locale: "es" }, { locale: "en" }]);
  });

  it.each([
    ["es", "Portfolio en desarrollo"],
    ["en", "Portfolio in development"],
  ])("keeps %s metadata private until launch", async (locale, title) => {
    const metadata = await generateMetadata({ params: params(locale) });
    expect(metadata.title).toBe(title);
    expect(metadata.description).toBeTruthy();
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it.each(["es", "en"])("sets the document language to %s", async (locale) => {
    const layout = await LocaleLayout({
      children: <main>Content</main>,
      params: params(locale),
    });
    expect(layout.type).toBe("html");
    expect(layout.props.lang).toBe(locale);
  });

  it.each([
    ["es", "Portfolio en desarrollo"],
    ["en", "Portfolio in development"],
  ])("renders the %s home page", async (locale, title) => {
    render(await HomePage({ params: params(locale) }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(title);
  });

  it("rejects unsupported locales in metadata, layout and page", async () => {
    const invalid = params("fr");
    const notFoundError = "NEXT_HTTP_ERROR_FALLBACK;404";
    await expect(generateMetadata({ params: invalid })).rejects.toThrow(notFoundError);
    await expect(LocaleLayout({ children: null, params: invalid })).rejects.toThrow(notFoundError);
    await expect(HomePage({ params: invalid })).rejects.toThrow(notFoundError);
  });
});
