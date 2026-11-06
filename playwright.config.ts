import { defineConfig, devices } from "@playwright/test";
const external = process.env.PORTFOLIO_URL;
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  workers: 2,
  timeout: 45000,
  expect: { timeout: 10000 },
  reporter: "list",
  use: {
    baseURL: external ?? "http://localhost:3100",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1500, height: 1000 } } },
    { name: "medium", use: { viewport: { width: 1000, height: 900 } } },
    {
      name: "phone",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
        reducedMotion: "reduce",
      },
    },
    {
      name: "small-phone",
      use: {
        viewport: { width: 320, height: 740 },
        isMobile: true,
        hasTouch: true,
        reducedMotion: "reduce",
      },
    },
  ],
  webServer: external
    ? undefined
    : {
        command: "node node_modules/next/dist/bin/next start --port 3100",
        url: "http://localhost:3100",
        reuseExistingServer: !process.env.CI,
        timeout: 30000,
      },
});
