import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { setThemeMode } from "./theme-preference";
import { ThemeSelector } from "./theme-selector";

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-theme");
  localStorage.clear();
});

describe("Theme selector", () => {
  it("exposes a native Spanish control with all three options", () => {
    render(<ThemeSelector locale="es" />);
    const selector = screen.getByRole("combobox", { name: "Tema" }) as HTMLSelectElement;
    expect(selector.value).toBe("system");
    expect(Array.from(selector.options, (option) => option.textContent)).toEqual([
      "Sistema",
      "Claro",
      "Oscuro",
    ]);
  });

  it("reflects the active mode and updates the document and preference", () => {
    setThemeMode("dark");
    render(<ThemeSelector locale="en" />);
    const selector = screen.getByRole("combobox", { name: "Theme" }) as HTMLSelectElement;
    expect(selector.value).toBe("dark");
    fireEvent.change(selector, { target: { value: "light" } });
    expect(selector.value).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("portfolio.theme")).toBe("light");
  });
});
