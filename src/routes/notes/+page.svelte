<script lang="ts">
  import type { Post } from "$lib/types";
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
  <h1>Notes to myself</h1>
  <section>
    <ul class="posts">
      {#each data.posts as post}
        <li>
          <a href={`notes/${post.slug}`}>
            <h2>{post.title}</h2>
          </a>
          <p><span>Last Update</span>{formatDate(post.date)}</p>
        </li>
      {/each}
    </ul>
  </section>
</article>

<style lang="scss">
  p {
    font-family: var(--font--display);
    font-size: rem(20px);
  }

  span {
    color: var(--color--brand);
    &:after {
      content: "|";
      padding-inline: rem(8px);
    }
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-flow: column;
    gap: rem(52px);
  }

  li {
    display: flex;
    flex-flow: column;
    gap: rem(16px);
  }

  a {
    color: var(--color--type);
    text-decoration: none;

    &:hover {
      color: var(--color--accent);
    }

    h2 {
      font-size: rem(36px);
      line-height: rem(48px);
      letter-spacing: -2.5%;
      font-weight: 500;
    }
  }

  h2 {
    color: inherit;
    transition: inherit;
  }
</style>
