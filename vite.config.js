import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";

export default defineConfig({
  plugins: [
    react(), // Plugin for React support
  ],

  // Load environment variables from these files based on NODE_ENV
  envFiles: [
    ".env",
    `.env.${process.env.NODE_ENV}`,
    ".env.local",
    `.env.${process.env.NODE_ENV}.local`,
  ],
});
