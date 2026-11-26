import { expect, test } from "@playwright/test";

test("the shell consumes shared semantic design tokens", async ({ page }) => {
  await page.goto("/es");
  const values = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);
    return {
      background: root.getPropertyValue("--ui-background").trim(),
      color: root.getPropertyValue("--ui-text").trim(),
      renderedBackground: body.backgroundColor,
    };
  });
  expect(values.background).not.toBe("");
  expect(values.color).not.toBe("");
  const link = page.getByRole("link", { name: "English" });
  await expect(link).toHaveClass("ui-action");
  await expect(link).toHaveAttribute("data-variant", "outline");
});

test("shared accents propagate without changing consumers", async ({ page }) => {
  await page.goto("/es");
  const link = page.getByRole("link", { name: "English" });
  await expect(link).toHaveCSS("color", "rgb(4, 120, 87)");
  await page.evaluate(() => {
    document.documentElement.style.setProperty("--ui-accent", "#005577");
  });
  await expect(link).toHaveCSS("color", "rgb(0, 85, 119)");
});

test("theme token pairs satisfy the planned contrast minima", async ({ page }) => {
  await page.goto("/es");
  for (const scheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    const ratios = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const luminance = (role: string) => {
        const color = root.getPropertyValue("--ui-" + role).trim();
        if (!/^#[0-9a-f]{6}$/i.test(color)) throw new Error("Missing color token: " + role);
        const channels = [1, 3, 5].map((index) => parseInt(color.slice(index, index + 2), 16) / 255);
        const linear = channels.map((value) =>
          value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
        );
        return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
      };
      return [
        ["text", "background", 4.5],
        ["text", "surface", 4.5],
        ["text", "surface-muted", 4.5],
        ["muted", "background", 4.5],
        ["muted", "surface", 4.5],
        ["muted", "surface-muted", 4.5],
        ["accent", "background", 4.5],
        ["accent", "surface", 4.5],
        ["on-accent", "accent", 4.5],
        ["on-accent", "accent-hover", 4.5],
        ["on-accent", "accent-pressed", 4.5],
        ["on-danger", "danger", 4.5],
        ["on-danger", "danger-hover", 4.5],
        ["on-danger", "danger-pressed", 4.5],
        ["focus", "surface", 3],
        ["control-border", "surface", 3],
      ].map(([foreground, background, minimum]) => {
        const a = luminance(String(foreground));
        const b = luminance(String(background));
        return { foreground, background, minimum: Number(minimum), ratio: (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05) };
      });
    });
    for (const pair of ratios) {
      expect(pair.ratio, scheme + ": " + pair.foreground + "/" + pair.background).toBeGreaterThanOrEqual(pair.minimum);
    }
  }
});
