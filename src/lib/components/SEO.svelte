<script lang="ts">
  interface Props {
    title: string;
    subtitle?: string;
    description: string;
  }

  let { title, description, subtitle = "Justin Smith" }: Props = $props();
</script>

<svelte:head>
  <title>{title} | {subtitle}</title>
  <meta name="description" content={description} />
</svelte:head>
