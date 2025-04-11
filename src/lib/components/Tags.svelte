<script lang="ts">
  import Tag from "$lib/components/Tag.svelte";

  interface Props {
    tags: string[];
  }

  const { tags }: Props = $props();
</script>

{#if tags.length > 0}
  <div>
    {#each tags as tag}
      <Tag label={tag} />
    {/each}
  </div>
{/if}

<style lang="scss">
  @use "$styles/functions" as *;

  div {
    display: flex;
    gap: px-to-rem(16px);
  }
</style>
