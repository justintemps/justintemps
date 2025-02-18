<script lang="ts">
  import Card from "$lib/components/WorkCard.svelte";
  import type { WorkSample } from "../../lib/types";

  interface Data {
    work: WorkSample[];
  }

  interface Props {
    data: Data;
  }

  let { data }: Props = $props();
</script>

<article>
  <hgroup>
    <h1>Work I've done</h1>
    <p>
      Projects I've worked on, things I've built, and stuff I've made—mostly
      together brilliant teams of people smarter than me.
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
