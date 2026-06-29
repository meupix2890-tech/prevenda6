import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = !!process.env.VERCEL;

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Em build dentro da Vercel: usa preset vercel. Fora (Lovable/Cloudflare): default.
  nitro: isVercel ? { preset: "vercel" } : undefined,
});
