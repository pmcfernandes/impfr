import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.js", import.meta.url)),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "app-shell.js" : "app-shell.cjs"),
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: { assetFileNames: "app-shell.[ext]" },
    },
    cssCodeSplit: false,
  },
});
