<script lang="ts">
  import LastUpdate from "$lib/components/LastUpdate.svelte";
  import Tags from "../../../lib/components/Tags.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { page } from "$app/state";

  let { data } = $props();
  const { title, description, date, tags } = $derived(data.meta);

  const Component = $derived(data.content);
</script>

<article>
  <SEO {title} {description} url={page.url.pathname} />
  <hgroup>
    <h1>{title}</h1>
    <p>{description}</p>
    <LastUpdate {date} />
    <Tags {tags} />
  </hgroup>
  <section>
    <Component />
  </section>
</article>

<style lang="scss">
  h1 {
    font-size: var(--text--2xl);
  }

  article :global(h2) {
    color: var(--color--brand);
  }
</style>
