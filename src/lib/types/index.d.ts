export type Categories = "sveltekit" | "svelte";

export type Post = {
  title: string;
  date: string;
  slug: string;
  published: boolean;
  summary: string;
  content: string;
};
