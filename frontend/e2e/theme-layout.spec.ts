import { expect, test } from "@playwright/test";

const backgrounds = {
  light: "rgb(246, 248, 247)",
  dark: "rgb(11, 20, 17)",
};

for (const system of ["light", "dark"] as const) {
  for (const mode of ["system", "light", "dark"] as const) {
    test(`${mode} theme on ${system} survives reload and locale`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: system });
      await page.goto("/es");
      const selector = page.getByRole("combobox", { name: "Tema" });
      await expect(selector).toHaveValue("system");
      await selector.selectOption(mode);
      const resolved = mode === "system" ? system : mode;
      await expect(page.locator("body")).toHaveCSS("background-color", backgrounds[resolved]);
      await page.reload();
      await expect(selector).toHaveValue(mode);
      await expect(page.locator("body")).toHaveCSS("background-color", backgrounds[resolved]);
      await page.getByRole("link", { name: "English" }).click();
      await expect(page).toHaveURL(/\/en$/);
      await expect(page.getByRole("combobox", { name: "Theme" })).toHaveValue(mode);
      await expect(page.locator("body")).toHaveCSS("background-color", backgrounds[resolved]);
    });
  }
}

test("system tracks OS changes; explicit mode wins", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en");
  await expect(page.locator("body")).toHaveCSS("background-color", backgrounds.light);
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("body")).toHaveCSS("background-color", backgrounds.dark);
  await page.getByRole("combobox", { name: "Theme" }).selectOption("light");
  await expect(page.locator("body")).toHaveCSS("background-color", backgrounds.light);
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("body")).toHaveCSS("background-color", backgrounds.light);
});

test("stored preference is applied before the document finishes loading", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en");
  await page.evaluate(() => localStorage.setItem("portfolio.theme", "dark"));
  await page.addInitScript(() => {
    const observe = () => {
      if (!document.body) {
        requestAnimationFrame(observe);
        return;
      }
      document.documentElement.dataset.initialTheme = document.documentElement.dataset.theme;
    };
    requestAnimationFrame(observe);
  });
  const response = await page.reload();
  const html = await response?.text();
  expect(html).toBeDefined();
  const bootstrap = html!.indexOf("localStorage.getItem");
  const body = html!.indexOf("<body");
  expect(bootstrap).toBeGreaterThan(-1);
  expect(bootstrap).toBeLessThan(body);
  await expect(page.locator("html")).toHaveAttribute("data-initial-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", backgrounds.dark);
});

test("invalid or denied storage does not prevent theme selection", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/es");
  await page.evaluate(() => localStorage.setItem("portfolio.theme", "invalid"));
  await page.reload();
  await expect(page.getByRole("combobox", { name: "Tema" })).toHaveValue("system");
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage denied");
      },
    });
  });
  await page.reload();
  const selector = page.getByRole("combobox", { name: "Tema" });
  await expect(selector).toHaveValue("system");
  await selector.selectOption("dark");
  await expect(page.locator("body")).toHaveCSS("background-color", backgrounds.dark);
  await expect(selector).toHaveValue("dark");
});

for (const width of [320, 768, 1440]) {
  for (const locale of ["es", "en"]) {
    for (const colorScheme of ["light", "dark"] as const) {
      test(`layout ${width}px / ${locale} / ${colorScheme}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ colorScheme });
        await page.goto("/" + locale);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        );
        expect(overflow).toBe(false);
        await expect(page.getByRole("banner")).toBeVisible();
        await expect(page.getByRole("main")).toBeVisible();
        await expect(page.getByRole("contentinfo")).toBeVisible();
        await expect(page.getByRole("combobox")).toBeVisible();
      });
    }
  }
}

test("keyboard skip link and reduced motion preserve access", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await expect(page.getByRole("link", { name: "Español" })).toHaveCSS("transition-duration", "0s");
});
