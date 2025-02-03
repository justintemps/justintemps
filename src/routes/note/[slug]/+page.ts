import { error } from "@sveltejs/kit";
import { render } from "svelte/server";

export async function load({ params }) {
  try {
    const post = await import(`$lib/content/posts/${params.slug}.md`);

    try {
      const content = render(post.default).body;
      console.log(content);
    } catch (e) {
      console.error(e);
    }

    const content = render(post.default).body;

    return {
      content: content,
      meta: post.metadata
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}`);
  }
}
