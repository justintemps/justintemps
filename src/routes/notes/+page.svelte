<script lang="ts">
  import type { Post } from "$lib/types";
  import Button from "$lib/components/Button.svelte";
  import LastUpdate from "$lib/components/LastUpdate.svelte";
  import Categories from "../../lib/components/Categories.svelte";

  interface Data {
    posts: Post[];
  }

  interface Props {
    data: Data;
  }

  let { data }: Props = $props();
</script>

<article>
  <section>
    <h1>Notes to myself</h1>
  </section>
  <section>
    <ul class="posts">
      {#each data.posts as post}
        <li>
          <article class="post">
            <a href={`note/${post.slug}`}>
              <h2>{post.title}</h2>
            </a>
            <LastUpdate date={post.date} />
            <Categories categories={post.categories} />
          </article>
        </li>
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
