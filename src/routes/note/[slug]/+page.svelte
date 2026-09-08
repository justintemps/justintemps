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

  // A post's lede is a paragraph, not a one-line page tagline, so it steps
  // down from the site-wide hgroup size to the body size and takes a reading
  // measure. It stays in the display face, which is what still marks it out
  // from the serif body copy that follows.
  hgroup p {
    max-width: 62ch;
    font-size: var(--text--md);
    line-height: var(--leading--body);
  }

  article :global(h2) {
    color: var(--color--brand);
  }
</style>
