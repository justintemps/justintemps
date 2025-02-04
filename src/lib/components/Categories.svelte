<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  const { categories } = $props();
</script>

{#snippet category(category: string)}
  <Button size="small" label={category} type="button" name={category} />
{/snippet}

{#if categories.length > 0}
  <div>
    {#each categories as cat}
      {@render category(cat)}
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
