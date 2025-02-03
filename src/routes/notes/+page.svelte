<script lang="ts">
  import type { Post } from "$lib/types";
  import Button from "$lib/components/Button.svelte";
  import { formatDate } from "$lib/utilities/formatDate";

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
            <p><span>Last Update</span>{formatDate(post.date)}</p>
            {#if post.categories.length > 0}
              <div class="categories">
                {#each post.categories as category}
                  <Button size="small" label={category} type="button" name={category} />
                {/each}
              </div>
            {/if}
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

    p {
      font-family: var(--font--display);
      font-size: px-to-rem(16px);
    }
  }

  .categories {
    display: flex;
    gap: px-to-rem(16px);
  }

  span {
    color: var(--color--brand);
    &:after {
      content: "|";
      padding-inline: px-to-rem(8px);
    }
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
