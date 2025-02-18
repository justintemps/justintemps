<script lang="ts">
  import content, { metadata } from "$lib/content/pages/about.md";
</script>

<svelte:head>
  <title>{metadata.title} | Justin Smith</title>
  <meta name="description" content={metadata.description} />
</svelte:head>

<article>
  <svelte:component this={content} />
</article>
