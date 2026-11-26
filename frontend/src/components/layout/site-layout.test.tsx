import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteLayout } from "./site-layout";

afterEach(cleanup);

describe("Site layout", () => {
  it.each([
    {
      locale: "es",
      home: "Inicio",
      language: "English",
      href: "/en",
      skip: "Saltar al contenido",
    },
    { locale: "en", home: "Home", language: "Español", href: "/es", skip: "Skip to content" },
  ] as const)("renders accessible $locale landmarks and links", (example) => {
    render(
      <SiteLayout locale={example.locale}>
        <h1>Content</h1>
      </SiteLayout>,
    );
    expect(screen.getByRole("banner")).toBeTruthy();
    expect(screen.getByRole("contentinfo")).toBeTruthy();
    expect(screen.getByRole("main").id).toBe("main");
    expect(screen.getByRole("heading", { name: "Content" })).toBeTruthy();
    const skip = screen.getByRole("link", { name: example.skip });
    expect(skip.getAttribute("href")).toBe("#main");
    const home = screen.getByRole("link", { name: example.home });
    expect(home.getAttribute("href")).toBe("/" + example.locale);
    expect(home.getAttribute("aria-current")).toBe("page");
    const link = screen.getByRole("link", { name: example.language });
    expect(link.getAttribute("href")).toBe(example.href);
    expect(link.getAttribute("hreflang")).toBe(example.href.slice(1));
  });
});
