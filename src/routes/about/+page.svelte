<script lang="ts">
  import content, { metadata } from "$lib/content/pages/about.md";
  import SEO from "$lib/components/SEO.svelte";
  import { page } from "$app/state";
</script>

<SEO
  title={metadata.title}
  description={metadata.description}
  url={page.url.pathname}
/>

<article>
  <svelte:component this={content} />
</article>
