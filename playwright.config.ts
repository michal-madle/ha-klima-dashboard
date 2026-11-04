import { cardPlaywrightConfig } from "ha-dashboard-kit/testing/playwright.mjs";

// Browser tests of the built card (`npm test` builds first); the configuration is the kit's.
export default cardPlaywrightConfig({ port: 4173 });
