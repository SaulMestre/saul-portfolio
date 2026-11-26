import { expect, test } from "@playwright/test";
import { scanAccessibility } from "./accessibility-scan";

for (const locale of ["es", "en"]) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`WCAG checks: ${locale} / ${colorScheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto("/" + locale);
      await expect(page.getByRole("main")).toBeVisible();
      expect(await scanAccessibility(page)).toEqual([]);
    });
  }
}
