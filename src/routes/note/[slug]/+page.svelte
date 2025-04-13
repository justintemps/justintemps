<script lang="ts">
  import LastUpdate from "$lib/components/LastUpdate.svelte";
  import Tags from "../../../lib/components/Tags.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { page } from "$app/state";

  let { data } = $props();
  const { title, description, date, tags } = data.meta;

  let Component = data.content;
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
  @use "$styles/functions" as *;
  @use "$styles/mixins" as *;

  article {
    gap: 2rem;

    :global(h2) {
      font-size: px-to-rem(20px);
      color: var(--color--brand);
    }
  }

  h1 {
    font-size: px-to-rem(32px);
    line-height: 1.2;
    letter-spacing: -1%;
  }

  @include breakpoint(md) {
    h1 {
      font-size: px-to-rem(60px);
      line-height: 1.2;
    }

    article {
      :global(h2) {
        font-size: px-to-rem(24px);
      }
    }
  }
</style>
