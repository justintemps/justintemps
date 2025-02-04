import { error } from "@sveltejs/kit";
import { render } from "svelte/server";

export async function load({ params }) {
  try {
    const post = await import(`$lib/content/posts/${params.slug}.md`);

    return {
      content: post.default,
      meta: post.metadata
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}`);
  }
}
