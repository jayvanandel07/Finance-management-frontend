import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  mode: process.env.NODE_ENV, // This automatically sets the mode based on Node environment
  envFiles: [
    ".env",
    `.env.${process.env.NODE_ENV}`,
    ".env.local",
    `.env.${process.env.NODE_ENV}.local`,
  ],
});
