import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "design-system-dev.spec.ts",
  outputDir: "test-results/development",
  workers: 1,
  use: { baseURL: "http://127.0.0.1:3001" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3001",
    url: "http://127.0.0.1:3001/es",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
