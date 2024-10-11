import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import frappeui from "frappe-ui/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    frappeui() // Use the frappe-ui plugin for integrating Frappe UI components
  ],
  optimizeDeps: {
    // Include specific dependencies to optimize build process
    include: [
      "frappe-ui > feather-icons", // Include feather-icons from frappe-ui
      "showdown", // Include showdown for Markdown parsing
      "engine.io-client" // Include engine.io-client for WebSocket support
    ],
  },
  build: {
    // path to generate the fiels
    outDir: "../simple_ticketing/public/frontend",
    // epmpy the perivius genrated iled befpre genrating
    emptyOutDir: true,
  }
})
