import type { Post } from "$lib/types";

export async function load({ fetch, url }) {
  const tags = url.searchParams.get("tags");

  // Always load the full list: it supplies the tag labels as they are written
  // in the notes, so the filter readout can show "AI" rather than the "ai"
  // that lives in the URL, even when the filter matches nothing.
  const response = await fetch("api/posts");
  const all: Post[] = await response.json();
  const labels = [...new Set(all.flatMap((post) => post.tags))];

  if (!tags) {
    return { posts: all, labels };
  }

  const filtered = await fetch(`api/posts?tags=${tags}`);
  const posts: Post[] = await filtered.json();
  return { posts, labels };
}
