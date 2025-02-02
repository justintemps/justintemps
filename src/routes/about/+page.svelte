<script lang="ts">
  import content from "$lib/content/pages/about.md";
</script>

<article>
  <section>
    <h1>A bit about me</h1>
  </section>
  <svelte:component this={content} />
</article>

<style lang="scss">
  @use "$styles/functions" as *;
  article {
    :global(p) {
      font-size: px-to-rem(28px);
    }
  }
</style>
