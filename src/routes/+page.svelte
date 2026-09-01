<script lang="ts">
  import content, { metadata } from "$lib/content/pages/home.md";
  import Clouds from "$lib/components/Clouds.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { page } from "$app/state";

  const { title, subtitle, description } = metadata;
</script>

<SEO {title} {subtitle} {description} url={page.url.pathname} />

<article>
  <Clouds />
  <h1>Justin time to blow your mind</h1>

  <svelte:component this={content} />
</article>

<style lang="scss">
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;

  h1 {
    filter: drop-shadow(14px 13px 11px rgba(0, 0, 0, 0.5));
    font-weight: 700;
    font-size: var(--text--4xl);
    line-height: 1.05;
  }

  article {
    max-width: 100%;
    gap: var(--space--page);
    @include edge-padding;

    :global(.hp--intro--img) {
      width: px-to-rem(200px);
      position: absolute;
      top: px-to-rem(-96px);
    }

    :global(.hp--intro) {
      display: flex;
      flex-direction: column;
      position: relative;
      justify-content: center;
      align-items: center;
      border: px-to-rem(4px) solid var(--color--brand);
      border-top: none;
      padding: px-to-rem(128px) px-to-rem(20px) px-to-rem(44px);
      margin-top: px-to-rem(96px);

      // The intro is a centred box, not running text: no flow spacing inside it.
      > :global(* + *) {
        margin-block-start: 0;
      }

      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 0;
        height: 4px;
        background-color: var(--color--brand);
      }

      &:before {
        left: 0;
        width: calc(50% - (#{px-to-rem(100px)} + 5%));
      }

      &:after {
        right: 0;
        width: calc(50% - (#{px-to-rem(100px)} + 5%));
      }
    }

    :global(h2) {
      filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
      font-weight: 700;
      font-size: var(--text--3xl);
      line-height: 1;
      text-align: center;
    }

    // Display copy for the home page only: same endpoints as before, now fluid.
    :global(p),
    :global(li) {
      font-size: #{fluid(24px, 40px)};
      line-height: var(--leading--snug);
      text-align: center;
      font-family: var(--font--type);
    }

    :global(ul) {
      margin-block: var(--space--block);
    }

    :global(li) {
      list-style: none;
      padding: var(--space--1) 0;
    }

    :global(.hp--list) :global(p) {
      font-size: var(--text--lg);
      line-height: var(--leading--body);
      padding: 0;
    }
  }

  @include breakpoint("md") {
    h1 {
      max-width: calc(var(--size--content--max) - 200px);
    }

    article {
      :global(li) {
        padding: var(--space--3);
      }

      :global(.hp--intro--img) {
        width: px-to-rem(300px);
        top: px-to-rem(-132px);
      }

      :global(.hp--intro) {
        padding: px-to-rem(200px) 13% px-to-rem(76px);
        margin-top: px-to-rem(130px);

        &:before {
          left: 0;
          width: calc(50% - (#{px-to-rem(150px)} + 5%));
        }

        &:after {
          right: 0;
          width: calc(50% - (#{px-to-rem(150px)} + 5%));
        }
      }
    }
  }
</style>
