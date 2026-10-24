import { defineConfig, devices } from "@playwright/test";

// Browser tests of the built card (`npm test` builds first). Chromium by default; WebKit,
// closer to Safari on iPhone, runs when installed (`npx playwright install webkit`) and
// PW_WEBKIT=1 is set.
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    locale: "cs-CZ",
    timezoneId: "Europe/Prague",
    viewport: { width: 393, height: 852 },
  },
  webServer: {
    command: "node tests/server.mjs",
    url: "http://127.0.0.1:4173/tests/harness.html",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 393, height: 852 } } },
    ...(process.env.PW_WEBKIT
      ? [{ name: "webkit", use: { ...devices["Desktop Safari"], viewport: { width: 393, height: 852 } } }]
      : []),
  ],
});
