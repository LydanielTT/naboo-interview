import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    dir: "./src",
    globals: true,
    include: ["**/*.{test,spec}.{ts,tsx}"],
    setupFiles: ["./src/setupTests.ts"],
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
