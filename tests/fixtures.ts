import { makeTest } from "ha-dashboard-kit/testing/fixtures.mjs";

/** `test` for the specs: with `npm run coverage` it also records the coverage of the card bundle (the kit's fixture). */
export const test = makeTest("ha-klima-dashboard.js");

export { expect } from "@playwright/test";
export type { CDPSession, Locator, Page } from "@playwright/test";
