<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  const { tags } = $props();
</script>

{#snippet tag(tag: string)}
  <Button size="small" label={tag} type="button" name={tag} />
{/snippet}

{#if tags.length > 0}
  <div>
    {#each tags as t}
      {@render tag(t)}
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
