<script lang="ts">
  import LastUpdate from "$lib/components/LastUpdate.svelte";
  import Categories from "$lib/components/Categories.svelte";
  import type { Post } from "../types";

  const { title, slug, categories, date }: Post = $props();
</script>

<article>
  <a href={`/note/${slug}`}>
    <h2>{title}</h2>
    <LastUpdate {date} />
    <Categories {categories} />
  </a>
</article>
