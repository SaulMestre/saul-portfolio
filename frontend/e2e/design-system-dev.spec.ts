import { expect, test } from "@playwright/test";

for (const locale of ["es", "en"]) {
  test(`development showcase works in ${locale} and both themes`, async ({ page }) => {
    await page.goto("/" + locale + "/design-system");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const selector = page.getByRole("combobox");
    for (const mode of ["light", "dark"]) {
      await selector.selectOption(mode);
      await expect(page.locator("html")).toHaveAttribute("data-theme", mode);
      for (const variant of ["primary", "secondary", "outline", "ghost", "destructive"]) {
        for (const size of ["sm", "md", "lg"]) {
          const attrs = `[data-variant="${variant}"][data-size="${size}"]`;
          await expect(page.locator("button" + attrs).first()).toBeVisible();
          await expect(page.locator("main a" + attrs).first()).toBeVisible();
        }
      }
      await expect(page.locator('button[aria-busy="true"]')).toBeDisabled();
      await expect(page.locator('button:disabled').first()).toBeDisabled();
      await expect(page.locator('[data-surface="surface"]').first()).toBeVisible();
      await expect(page.locator('[data-surface="muted"]').first()).toBeVisible();
    }
  });
}
