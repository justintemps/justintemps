<script lang="ts">
  import content from "$lib/content/pages/about.md";
</script>

<article>
  <svelte:component this={content} />
</article>

<style lang="scss">
  article {
    :global(p) {
      font-size: rem(28px);
    }
  }

  @include breakpoint(md) {
    article {
      gap: rem(64px);
      :global(h1),
      :global(section) {
        padding-inline: 0;
      }
    }
  }
</style>
