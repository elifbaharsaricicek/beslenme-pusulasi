import { defineConfig } from "vite";

export default defineConfig(() => ({
  // Cloudflare Pages benzeri static deploylar icin goreli yol:
  base: "./",
  server: {
    port: 5173,
  },
}));
