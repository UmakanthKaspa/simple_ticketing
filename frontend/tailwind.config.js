/** @type {import('tailwindcss').Config} */
import tailwindConfig from "frappe-ui/src/utils/tailwind.config";

export default {
  // Presets allow us to extend or override the default Tailwind configuration provided by Frappe UI
  presets: [tailwindConfig],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // Include paths for Frappe UI components to ensure utility classes are generated for them as well
    "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
    "../node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

