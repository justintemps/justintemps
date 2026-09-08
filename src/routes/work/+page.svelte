<script lang="ts">
  import Card from "$lib/components/WorkCard.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { metadata } from "$lib/content/pages/work.md";
  import type { WorkSample } from "$lib/types";
  import { page } from "$app/state";

  interface Data {
    work: WorkSample[];
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
    <h1>{title}</h1>
    <p>{description}</p>
  </hgroup>
  <section>
    <ul>
      {#each data.work as sample}
        <li>
          <Card {...sample} />
        </li>
      {/each}
    </ul>
  </section>
</article>

<style lang="scss">
  // Each project is a full-width screenshot with its caption underneath,
  // stacked in the same column every other page uses. Entries are spaced
  // with the same block gap that separates the header from the list, so the
  // whole page runs on one rhythm.
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-flow: column;
    gap: var(--space--block);
  }
</style>
