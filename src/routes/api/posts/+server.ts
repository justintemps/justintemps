import { json } from "@sveltejs/kit";
import { isSubsetOf } from "$lib/utilities/isSubsetOf.js";
import type { Post } from "$lib/types";

interface GetPostsOptions {
  tags: string | null;
}

async function getPosts({ tags }: GetPostsOptions) {
  let posts: Post[] = [];

  const paths = import.meta.glob("/src/lib/content/posts/*.md", {
    eager: true
  });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".md", "");

    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata as Omit<Post, "slug">;
      const post = { ...metadata, slug } satisfies Post;
      post.published && posts.push(post);
    }
  }

  if (tags) {
    // First get the tags from the query string
    const queryTags = tags.split(",");

    // Then filter the posts by the tags.
    posts = posts.filter((post) => {
      // Normalize the tags in the posts so they'll match
      // the format of the ones passed in the query string
      const postTags = post.tags.map((tag) =>
        encodeURIComponent(tag.toLowerCase())
      );
      return isSubsetOf(postTags, queryTags);
    });
  }

  // sort the posts by date
  posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return posts;
}

export async function GET({ url }) {
  const tags = url.searchParams.get("tags");
  const posts = await getPosts({ tags });
  return json(posts);
}
