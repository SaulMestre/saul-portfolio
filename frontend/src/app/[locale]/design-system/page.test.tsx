import { afterEach, describe, expect, it, vi } from "vitest";
import DesignSystemPage from "./page";

afterEach(() => vi.unstubAllEnvs());

describe("Development showcase route", () => {
  it.each(["es", "en"])("allows %s only in development", async (locale) => {
    vi.stubEnv("NODE_ENV", "development");
    const page = await DesignSystemPage({ params: Promise.resolve({ locale }) });
    expect(page.props.locale).toBe(locale);
  });

  it("denies production access", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const params = Promise.resolve({ locale: "es" });
    await expect(DesignSystemPage({ params })).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  it("rejects unsupported development locales", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const params = Promise.resolve({ locale: "fr" });
    await expect(DesignSystemPage({ params })).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });
});
