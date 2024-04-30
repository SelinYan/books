import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
    build: {
      chunkSizeWarningLimit: 1000,
    },
  };

  if (command !== "serve") {
    config.base = "/react-vite-gh-pages/";
  }

  return config;
});
