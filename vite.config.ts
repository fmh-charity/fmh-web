import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [svgr({
      include: "**/*.svg?react",
      exclude: "",
    }), react()],
    server: {
      port: 3000,
      proxy: {
        "/api/fmh": "https://test.vhospice.org",
      },
    }, 
    css: {
      preprocessorOptions: {
        less: {},
      },
    },
    define: {
      "process.env.REACT_APP_API_URL": JSON.stringify(env.VITE_API_URL),
    }
  };
});
