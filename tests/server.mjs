// Static file server for the Playwright tests: serves the repository root, so the harness
// can load the built card (ha-klima-dashboard.js) and the test fonts from node_modules.
// KD_BUNDLE serves another build of the card under the same name (npm run coverage).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = Number(process.env.PORT ?? 4173);
const bundle = process.env.KD_BUNDLE ? resolve(root, process.env.KD_BUNDLE) : undefined;
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
};

createServer(async (request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url ?? "/", "http://x").pathname));
  const file = bundle && path === "/ha-klima-dashboard.js" ? bundle : join(root, path);
  if (!file.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Test server on http://127.0.0.1:${port}`);
});
