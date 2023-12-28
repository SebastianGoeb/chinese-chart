/// <reference types="vitest" />

import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: "/chinese-chart/",
  server: {
    host: "0.0.0.0",
  },
  plugins: [
    solid(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
  ],
  test: {
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
    globals: true,
  },
});
