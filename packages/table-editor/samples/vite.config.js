import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// A app de samples importa o componente fonte no diretório pai.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: { allow: [".."] },
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
