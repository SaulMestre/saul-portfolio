import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ActionLink } from "./action-link";

afterEach(cleanup);

describe("ActionLink", () => {
  it("renders a semantic navigation link with default action styling", () => {
    render(<ActionLink href="/en">English</ActionLink>);
    const link = screen.getByRole("link", { name: "English" });
    expect(link.getAttribute("href")).toBe("/en");
    expect(link.getAttribute("data-variant")).toBe("primary");
    expect(link.getAttribute("data-size")).toBe("md");
    expect(link.className).toBe("ui-action");
    expect(link.hasAttribute("aria-disabled")).toBe(false);
  });

  it("supports the shared action variant and locale semantics", () => {
    render(
      <ActionLink
        href="/es"
        variant="outline"
        size="sm"
        hrefLang="es"
        documentNavigation
        lang="es"
        aria-current="page"
      >
        Español
      </ActionLink>,
    );
    const link = screen.getByRole("link");
    expect(link.dataset.variant).toBe("outline");
    expect(link.dataset.size).toBe("sm");
    expect(link.getAttribute("hreflang")).toBe("es");
    expect(link.getAttribute("lang")).toBe("es");
    expect(link.getAttribute("aria-current")).toBe("page");
  });
});
