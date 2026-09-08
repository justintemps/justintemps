<script lang="ts">
  import type { Post } from "$lib/types";
  import Card from "$lib/components/NoteCard.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { metadata } from "$lib/content/pages/notes.md";
  import { page } from "$app/state";

  interface Data {
    posts: Post[];
    labels: string[];
  }

  interface Props {
    data: Data;
  }

  const { title, description } = metadata;

  let { data }: Props = $props();

  // The active filter comes straight from the URL, so it survives reloads and
  // back navigation. The URL holds tags lowercased and encoded (see the Tag
  // component); look each one up to show the label as the notes write it.
  const activeTags = $derived(
    (page.url.searchParams.get("tags") ?? "")
      .split(",")
      .filter(Boolean)
      .map(
        (slug) =>
          data.labels.find(
            (label) => encodeURIComponent(label.toLowerCase()) === slug
          ) ?? decodeURIComponent(slug)
      )
  );
</script>

<SEO {title} {description} url={page.url.pathname} />

<article>
  <hgroup>
    <h1>{title}</h1>
    <p>{description}</p>
    {#if activeTags.length > 0}
      <p class="filter">
        <span>Tagged</span>{activeTags.join(", ")}
        <a href="/notes">Show all notes</a>
      </p>
    {/if}
  </hgroup>
  <section>
    {#if data.posts.length > 0}
      <ul>
        {#each data.posts as post (post.slug)}
          <li><Card {...post} /></li>
        {/each}
      </ul>
    {:else}
      <p class="empty">Nothing here yet with all of those tags.</p>
    {/if}
  </section>
</article>

<style lang="scss">
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;

  // The filter readout mirrors the "Last Update | date" meta line on the
  // notes themselves: a brand-coloured label, a bar, then the value.
  .filter {
    font-family: var(--font--display);
    font-size: var(--text--xs);
    line-height: var(--leading--meta);

    span {
      color: var(--color--brand);

      &::after {
        content: "|";
        padding-inline: px-to-rem(8px);
      }
    }

    a {
      margin-inline-start: var(--space--2);
    }
  }

  // Notes have no picture to anchor them, so hairline rules do the job the
  // screenshots do on the work page: they mark where one entry ends and the
  // next begins. The rules are the accent colour faded well back so the
  // yellow date stamps stay the brightest thing in each row.
  ul {
    --rule: color-mix(in srgb, var(--color--accent) 22%, transparent);

    list-style: none;
    padding: 0;
    display: flex;
    flex-flow: column;
    border-block-end: px-to-rem(1px) solid var(--rule);
  }

  li {
    padding-block: var(--space--4);
    border-block-start: px-to-rem(1px) solid var(--rule);

    @include breakpoint(md) {
      padding-block: var(--space--5);
    }
  }

  .empty {
    font-family: var(--font--display);
    font-size: var(--text--sm);
    line-height: var(--leading--meta);
  }
</style>
