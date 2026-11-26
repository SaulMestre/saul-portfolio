import axe from "axe-core";
import type { Page } from "@playwright/test";

export async function scanAccessibility(page: Page, selector?: string) {
  await page.addScriptTag({ content: axe.source });

  return page.evaluate(async (scope) => {
    const engine = (window as typeof window & { axe: typeof axe }).axe;
    const result = await engine.run(scope ?? document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
      },
    });

    return result.violations.map(({ id, impact, nodes }) => ({
      id,
      impact,
      nodes: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    }));
  }, selector);
}
