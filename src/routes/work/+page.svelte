<script lang="ts">
  import work from "$lib/content/pages/work.json";
  import Card from "$lib/components/Card.svelte";
</script>

<article>
  <hgroup>
    <h1>{work.title}</h1>
  </hgroup>
  <section>
    <ul>
      {#each work.projects as project}
        <li>
          <Card {...project} />
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
