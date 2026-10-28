// `npm run coverage`: the browser tests with the JavaScript coverage of the card (the kit's runner).
import { runCoverage } from "ha-dashboard-kit/testing/coverage.mjs";

await runCoverage({ name: "Klima Dashboard", card: "ha-klima-dashboard.js", port: 4183 });
