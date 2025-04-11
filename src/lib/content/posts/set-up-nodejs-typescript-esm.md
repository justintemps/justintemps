---
title: How to set up a Node.js project with TypeScript and ESM
description: It's 2025 and working with TypeScript and ESM in Node.js is still kind of a pain in the ass. Here's a modern setup.
date: 2025-1-28
tags:
  - Node.js
  - TypeScript
published: true
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elementum tortor enim, vitae sollicitudin nisi efficitur sit amet. Donec et nulla ipsum. Proin ac rhoncus turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus.

## It’s not as easy as it looks

Aliquam gravida semper egestas. Cras vehicula velit ut lorem molestie auctor. Donec euismod nulla eu nisl efficitur interdum. Integer efficitur eros varius, malesuada eros vitae, luctus sapien. Proin id eros at nisi ornare sagittis. In rhoncus nisl vel ipsum elementum, id condimentum mi porta. Cras eleifend turpis sit amet magna gravida efficitur. Nunc vitae magna vel massa tempor mollis.

Suspendisse sit amet ipsum at massa molestie tincidunt. Pellentesque lobortis laoreet sodales. Suspendisse dolor velit, commodo eget eleifend eu, bibendum ut mi. Nunc at est non diam vehicula maximus. Cras a mauris at nibh lacinia faucibus.

```ts
/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md", ".svx"],
  highlight: {
    highlighter: async (code, lang = "text") => {
      const highlighter = await createHighlighter({
        themes: [theme],
        langs: ["javascript", "typescript", "python", "bash"]
      });
      await highlighter.loadLanguage("javascript", "typescript");
      const html = highlighter.codeToHtml(code, { lang, theme });

      // This escapes the html
      const escapedHtml = escapeSvelte(escapedHtml);
      return `{@html \`${escapedHtml}\` }`;
    }
  }
};
```
