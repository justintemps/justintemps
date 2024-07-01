<script lang="ts">
  import content from "$lib/content/pages/about.md";
</script>

<article>
  <svelte:component this={content} />
</article>

<style lang="scss">
  article {
    width: 100%;
    max-width: var(--size--column);
    display: flex;
    flex-flow: column;
    gap: rem(36px);

    :global(h1) {
      padding-inline: var(--size--edge--padding);
    }

    :global(section) {
      display: flex;
      flex-direction: column;
      gap: rem(24px);
      padding-inline: var(--size--edge--padding);
    }

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
