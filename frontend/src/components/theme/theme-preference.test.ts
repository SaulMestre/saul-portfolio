import { afterEach, describe, expect, it, vi } from "vitest";
import { getThemeMode, normalizeThemeMode, setThemeMode, subscribeToTheme } from "./theme-preference";

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("data-theme");
  localStorage.clear();
});

describe("Theme preference", () => {
  it.each(["light", "dark", "system"] as const)("accepts %s", (mode) => {
    expect(normalizeThemeMode(mode)).toBe(mode);
    setThemeMode(mode);
    expect(getThemeMode()).toBe(mode);
    expect(localStorage.getItem("portfolio.theme")).toBe(mode);
  });

  it.each([null, "", "invalid"])("normalizes invalid stored values: %s", (value) => {
    expect(normalizeThemeMode(value)).toBe("system");
  });

  it("derives system mode from an absent or invalid override", () => {
    expect(getThemeMode()).toBe("system");
    document.documentElement.dataset.theme = "invalid";
    expect(getThemeMode()).toBe("system");
  });

  it("clears the override in system mode", () => {
    setThemeMode("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    setThemeMode("system");
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("keeps the active mode if storage is denied", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage denied");
    });
    expect(() => setThemeMode("light")).not.toThrow();
    expect(getThemeMode()).toBe("light");
  });

  it("notifies subscribers and supports cleanup", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToTheme(listener);
    setThemeMode("dark");
    expect(listener).toHaveBeenCalledOnce();
    unsubscribe();
    setThemeMode("light");
    expect(listener).toHaveBeenCalledOnce();
  });
});
