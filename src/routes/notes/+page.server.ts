import type { Post } from "$lib/types";

export async function load({ fetch, url }) {
  const tags = url.searchParams.get("tags");

  if (tags) {
    const response = await fetch(`api/posts?tags=${tags}`);
    const posts: Post[] = await response.json();
    return { posts };
  }

  const response = await fetch("api/posts");
  const posts: Post[] = await response.json();
  return { posts };
}
