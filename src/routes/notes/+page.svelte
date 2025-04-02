<script lang="ts">
  import type { Post } from "$lib/types";
  import Card from "$lib/components/NoteCard.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { metadata } from "$lib/content/pages/notes.md";
  import { page } from "$app/state";

  interface Data {
    posts: Post[];
  }

  interface Props {
    data: Data;
  }

  let { data }: Props = $props();

  const { title, description } = metadata;
</script>

<SEO {title} {description} url={page.url.pathname} />

<article>
  <hgroup>
    <h1>{metadata.title}</h1>
    <p>{metadata.description}</p>
  </hgroup>
  <section>
    <ul>
      {#each data.posts as post}
        <li><Card {...post} /></li>
      {/each}
    </ul>
  </section>
</article>

<style lang="scss">
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;

  article.post {
    display: flex;
    flex-flow: column;
    gap: px-to-rem(16px);
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-flow: column;
    gap: px-to-rem(52px);
  }
</style>
