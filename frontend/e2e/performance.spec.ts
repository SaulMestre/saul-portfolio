import { expect, test } from "@playwright/test";
import { writeFile } from "node:fs/promises";

type Metrics = { lcp: number; cls: number };
type Shift = PerformanceEntry & { value: number; hadRecentInput: boolean };

const profile = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  cpuRate: 4,
  latency: 150,
  downloadThroughput: 200000,
  uploadThroughput: 93750,
  observationMs: 5000,
} as const;

function median(values: number[]) {
  return [...values].sort((a, b) => a - b)[1];
}

test("capture repeatable production shell performance", async ({ browser, baseURL }, testInfo) => {
  const samples: Metrics[] = [];

  for (let index = 0; index < 3; index++) {
    const context = await browser.newContext({
      baseURL,
      viewport: profile.viewport,
      deviceScaleFactor: profile.deviceScaleFactor,
      colorScheme: "light",
      serviceWorkers: "block",
    });

    try {
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      await session.send("Network.enable");
      await session.send("Network.setCacheDisabled", { cacheDisabled: true });
      await session.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: profile.latency,
        downloadThroughput: profile.downloadThroughput,
        uploadThroughput: profile.uploadThroughput,
      });
      await session.send("Emulation.setCPUThrottlingRate", { rate: profile.cpuRate });

      await page.addInitScript(() => {
        const metrics: Metrics = { lcp: 0, cls: 0 };
        Object.assign(window, { portfolioLabMetrics: metrics });

        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            metrics.lcp = Math.max(metrics.lcp, entry.startTime);
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });

        let first = 0;
        let last = 0;
        let sessionValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as Shift[]) {
            if (entry.hadRecentInput) continue;
            const time = entry.startTime;
            if (sessionValue > 0 && time - last < 1000 && time - first < 5000) {
              sessionValue += entry.value;
            } else {
              first = time;
              sessionValue = entry.value;
            }
            last = time;
            metrics.cls = Math.max(metrics.cls, sessionValue);
          }
        }).observe({ type: "layout-shift", buffered: true });
      });

      const response = await page.goto("/es", { waitUntil: "load" });
      expect(response?.ok()).toBe(true);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      // A fixed observation window is intentional for comparable lab measurements.
      await page.waitForTimeout(profile.observationMs);
      const metrics = await page.evaluate(
        () => (window as unknown as { portfolioLabMetrics: Metrics }).portfolioLabMetrics,
      );
      expect(Number.isFinite(metrics.lcp) && metrics.lcp > 0).toBe(true);
      expect(Number.isFinite(metrics.cls) && metrics.cls >= 0).toBe(true);
      samples.push(metrics);

      if (index === 0) {
        await page.screenshot({ path: testInfo.outputPath("mobile.png"), fullPage: true });
      }
    } finally {
      await context.close();
    }
  }

  const desktop = await browser.newContext({
    baseURL,
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
    deviceScaleFactor: 1,
  });
  try {
    const page = await desktop.newPage();
    await page.goto("/es");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath("desktop.png"), fullPage: true });
  } finally {
    await desktop.close();
  }

  const report = {
    browser: browser.version(),
    node: process.version,
    platform: process.platform,
    locale: "es",
    systemTheme: "light",
    profile,
    samples,
    median: {
      lcp: median(samples.map((sample) => sample.lcp)),
      cls: median(samples.map((sample) => sample.cls)),
    },
  };
  await writeFile(testInfo.outputPath("metrics.json"), JSON.stringify(report, null, 2) + "\n");
  console.log("Portfolio lab performance:", JSON.stringify(report));
  expect(report.median.lcp).toBeLessThanOrEqual(2500);
  expect(report.median.cls).toBeLessThanOrEqual(0.1);
});
