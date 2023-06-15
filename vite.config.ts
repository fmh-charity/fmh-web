import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/fmh": "https://test.vhospice.org",
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // eslint-disable-next-line quotes
        additionalData: '@import "/src/styles/variables.less";',
      },
    },
  },
});
