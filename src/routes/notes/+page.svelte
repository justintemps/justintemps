<script lang="ts">
  import type { Post } from "$lib/types";
  import Card from "$lib/components/NoteCard.svelte";

  interface Data {
    posts: Post[];
  }

  interface Props {
    data: Data;
  }

  let { data }: Props = $props();
</script>

<article>
  <hgroup>
    <h1>Notes to myself</h1>
    <p>Things I wrote down so I wouldn't forget</p>
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

  a {
    color: var(--color--type);
    text-decoration: none;

    &:hover {
      color: var(--color--accent);
    }
  }

  h2 {
    color: inherit;
    transition: inherit;
  }
</style>
