import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { actionSizes, actionVariants } from "../../components/ui/button";
import { ComponentShowcase } from "./component-showcase";

afterEach(cleanup);

describe("Component showcase", () => {
  it.each(["es", "en"] as const)("shows real primitives in %s", (locale) => {
    render(<ComponentShowcase locale={locale} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    for (const variant of actionVariants) {
      for (const size of actionSizes) {
        const button = document.querySelector(
          `button[data-variant="${variant}"][data-size="${size}"]`,
        );
        const link = document.querySelector(
          `a[data-variant="${variant}"][data-size="${size}"]`,
        );
        expect(button).not.toBeNull();
        expect(link).not.toBeNull();
      }
    }
    const busy = document.querySelector<HTMLButtonElement>('button[aria-busy="true"]');
    expect(busy?.disabled).toBe(true);
    expect(document.querySelectorAll("button:disabled").length).toBeGreaterThanOrEqual(2);
    expect(document.querySelector('[data-surface="surface"]')).not.toBeNull();
    expect(document.querySelector('[data-surface="muted"]')).not.toBeNull();
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(within(mainHeading).queryByRole("button")).toBeNull();
  });
});
