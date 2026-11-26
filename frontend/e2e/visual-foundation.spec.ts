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
  await page.emulateMedia({ colorScheme: "light" });
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
      const probe = document.createElement("span");
      document.body.append(probe);
      const luminance = (role: string) => {
        probe.style.color = "var(--ui-" + role + ")";
        const color = getComputedStyle(probe).color;
        const channels = color.match(/\d+(?:\.\d+)?/g)?.map(Number);
        if (!channels || channels.length !== 3 || !color.startsWith("rgb(")) {
          throw new Error("Unresolved color token: " + role + ": " + color);
        }
        const linear = channels.map((channel) => {
          const value = channel / 255;
          return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });
        return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
      };
      const pairs = [
        ["text", "background", 4.5],
        ["text", "surface", 4.5],
        ["text", "surface-muted", 4.5],
        ["muted", "background", 4.5],
        ["muted", "surface", 4.5],
        ["muted", "surface-muted", 4.5],
        ["accent", "background", 4.5],
        ["accent", "surface", 4.5],
        ["accent", "surface-muted", 4.5],
        ["on-accent", "accent", 4.5],
        ["on-accent", "accent-hover", 4.5],
        ["on-accent", "accent-pressed", 4.5],
        ["on-danger", "danger", 4.5],
        ["on-danger", "danger-hover", 4.5],
        ["on-danger", "danger-pressed", 4.5],
        ["focus", "surface", 3],
        ["control-border", "surface", 3],
      ] as const;
      const result = pairs.map(([foreground, background, minimum]) => {
        const a = luminance(foreground);
        const b = luminance(background);
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        return { foreground, background, minimum, ratio };
      });
      probe.remove();
      return result;
    });
    for (const pair of ratios) {
      const label = scheme + ": " + pair.foreground + "/" + pair.background;
      expect(pair.ratio, label).toBeGreaterThanOrEqual(pair.minimum);
    }
  }
});
