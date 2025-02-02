<script lang="ts">
  import content from "$lib/content/pages/about.md";
</script>

<article>
  <svelte:component this={content} />
</article>

<style lang="scss">
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;
  article {
    :global(p) {
      font-size: px-to-rem(28px);
    }
  }

  @include breakpoint(md) {
    article {
      :global(h1),
      :global(section) {
        padding-inline: 0;
      }
    }
  }
</style>
