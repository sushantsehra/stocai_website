import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  // Next.js preserves JSX for its compiler; component tests need to transform it.
  oxc: { jsx: { runtime: "automatic" } },
  css: { postcss: { plugins: [] } },
});
