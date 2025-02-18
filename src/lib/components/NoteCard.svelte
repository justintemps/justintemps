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

<style lang="scss">
  @use "$styles/functions" as *;
  article,
  a {
    height: 100%;
    width: 100%;
  }

  a {
    padding: px-to-rem(24px);
    background-color: var(--color--bg--accent);
    border: px-to-rem(2px) solid var(--color--bg--accent);
    box-shadow: 8px 8px 12px var(--color--shadow);
    transition: outline 150ms ease-in-out;
    text-decoration: none;
    display: flex;
    flex-flow: column;
    gap: px-to-rem(24px);

    &:hover,
    &:focus {
      outline: px-to-rem(4px) solid var(--color--brand);
      outline-offset: px-to-rem(4px);
    }
  }

  h2 {
    position: relative;
    font-size: px-to-rem(28px);
  }
</style>
