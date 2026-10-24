import { test as base } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

/**
 * `test` for the specs. With KD_COVERAGE set (`npm run coverage`, tests/coverage.mjs) every test
 * records the JavaScript coverage of the card bundle in its page (V8, Chromium only) and writes
 * it to coverage/raw/; otherwise it is the plain Playwright `test`.
 *
 * Chromium reports the coverage of the current page only: what an earlier page of the same test
 * executed is gone after the next navigation. So the coverage is taken before every `page.goto`.
 */
export const test = base.extend<{ collectCoverage: void }>({
  collectCoverage: [
    async ({ page, browserName }, use, testInfo) => {
      if (!process.env.KD_COVERAGE || browserName !== "chromium") {
        await use();
        return;
      }
      const options = { resetOnNavigation: false };
      const entries: unknown[] = [];
      const take = async () => {
        const all = await page.coverage.stopJSCoverage();
        entries.push(...all.filter((entry) => entry.url.endsWith("/ha-klima-dashboard.js")));
      };
      await page.coverage.startJSCoverage(options);
      const goto = page.goto.bind(page);
      page.goto = async (...args: Parameters<Page["goto"]>) => {
        await take();
        await page.coverage.startJSCoverage(options);
        return goto(...args);
      };
      await use();
      await take();
      await mkdir("coverage/raw", { recursive: true });
      const title = testInfo.titlePath.slice(1).join(" › ");
      await writeFile(`coverage/raw/${testInfo.testId}.json`, JSON.stringify({ title, entries }));
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";
export type { CDPSession, Page } from "@playwright/test";
