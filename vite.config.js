import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"


export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "credentialless"
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['@google/generative-ai']
  },
  build: {
    commonjsOptions: {
      include: [/@google\/generative-ai/, /node_modules/]
    }
  }
})
