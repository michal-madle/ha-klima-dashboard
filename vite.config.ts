import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "ha-klima-dashboard",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
});
