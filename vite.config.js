import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "172.31.11.103",
    // host: "10.0.70.111",
    port: 5173,
  },
});
