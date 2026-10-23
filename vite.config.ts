import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/ha-klima-dashboard.ts",
      formats: ["es"],
      fileName: "ha-klima-dashboard",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
