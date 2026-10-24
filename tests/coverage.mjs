// `npm run coverage`: the browser tests with the JavaScript coverage of the card (V8 in Chromium),
// mapped back to src/*.ts through an inline source map. The card is built separately into
// coverage/build (the distributed ha-klima-dashboard.js stays untouched) and served on its own
// port. Prints a table per file; coverage/report/coverage-final.json (Istanbul) allows an exact
// before / after comparison, coverage/raw/ keeps the V8 data of each test. Extra arguments go to
// `playwright test`.
import { execFileSync } from "node:child_process";
import { readdir, readFile, rm } from "node:fs/promises";
import { CoverageReport } from "monocart-coverage-reports";

await rm("coverage", { recursive: true, force: true });
execFileSync("npx", ["vite", "build", "--sourcemap", "inline", "--outDir", "coverage/build", "--emptyOutDir"], { stdio: "inherit" });

let failed = false;
try {
  execFileSync("npx", ["playwright", "test", ...process.argv.slice(2)], {
    stdio: "inherit",
    env: { ...process.env, KD_COVERAGE: "1", KD_BUNDLE: "coverage/build/ha-klima-dashboard.js", KD_PORT: "4183" },
  });
} catch {
  failed = true;
}

const report = new CoverageReport({
  name: "Klima Dashboard",
  outputDir: "coverage/report",
  reports: ["console-details", "json-summary", "json"],
  sourceFilter: (path) => path.includes("src/"),
});
for (const file of await readdir("coverage/raw")) {
  const { entries } = JSON.parse(await readFile(`coverage/raw/${file}`, "utf8"));
  // A test that never opens the card page (e.g. the check of the example YAML) has nothing to add.
  if (entries.length > 0) {
    await report.add(entries);
  }
}
await report.generate();
if (failed) {
  process.exitCode = 1;
}
