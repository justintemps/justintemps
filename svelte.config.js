import { mdsvex, escapeSvelte } from "mdsvex";
import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { createHighlighter } from "shiki";
import { theme } from "./src/syntax-highlight.js";

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md", ".svx"],
  highlight: {
    highlighter: async (code, lang = "text") => {
      const highlighter = await createHighlighter({
        themes: [theme],
        langs: [
          "javascript",
          "typescript",
          "python",
          "bash",
          "html",
          "svelte",
          "json"
        ]
      });
      await highlighter.loadLanguage("javascript", "typescript");
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
      return `{@html \`${html}\` }`;
    }
  }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

  kit: {
    adapter: adapter()
  },

  extensions: [".svelte", ".svx", ".md"]
};

export default config;
