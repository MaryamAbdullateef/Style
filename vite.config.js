import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // This must be uncommented

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Now this will work because the import above is active
  ],
  server: {
    port: 3000,
    open: true,
  },
});
