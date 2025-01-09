import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/yugioh-fm-tools/",
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/yugioh-fm-tools/api": {
        target: "http://127.0.0.1:3002",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
