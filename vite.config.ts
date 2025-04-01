import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  resolve: {
    alias: {
      $styles: path.resolve(__dirname, "src/styles")
    }
  }
});
