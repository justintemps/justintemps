<script lang="ts">
  import Card from "$lib/components/WorkCard.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { metadata } from "$lib/content/pages/work.md";
  import type { WorkSample } from "../../lib/types";
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
    <h1>{metadata.title}</h1>
    <p>
      {metadata.description}
    </p>
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
  @use "$styles/functions" as *;

  article {
    max-width: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  hgroup {
    max-width: var(--size--column--lg);
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: auto;
    gap: px-to-rem(64px);
  }
</style>
