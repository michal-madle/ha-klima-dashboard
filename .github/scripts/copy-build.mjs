import { copyFile } from "node:fs/promises";

await copyFile(
    new URL("../../dist/ha-klima-dashboard.js", import.meta.url),
    new URL("../../ha-klima-dashboard.js", import.meta.url),
);