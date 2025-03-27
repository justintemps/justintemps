<script lang="ts">
  import content, { metadata } from "$lib/content/pages/home.md";
  import Clouds from "$lib/components/Clouds.svelte";
  import SEO from "$lib/components/SEO.svelte";
</script>

<SEO {...metadata} />

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
    font-weight: bold;
    font-size: px-to-rem(72px);
    line-height: px-to-rem(84px);
  }

  article {
    max-width: 100%;
    gap: px-to-rem(60px);
    @include edge-padding;

    @include breakpoint("md") {
      gap: px-to-rem(84px);
    }

    :global(.hp--intro--img) {
      width: px-to-rem(200px);
      position: absolute;
      top: px-to-rem(-128px);
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
      margin-top: px-to-rem(80px);

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
      font-weight: bold;
      font-size: px-to-rem(48px);
      line-height: px-to-rem(48px);
      text-align: center;
    }

    :global(p),
    :global(li) {
      font-size: px-to-rem(24px);
      line-height: px-to-rem(36px);
      text-align: center;
      font-family: var(--font--type);
    }

    :global(ul) {
      margin: px-to-rem(40px) 0;
    }

    :global(li) {
      list-style: none;
      padding: px-to-rem(4px) 0;
    }
  }

  @include breakpoint("md") {
    h1 {
      font-size: px-to-rem(136px);
      line-height: px-to-rem(148px);
      max-width: calc(var(--size--content--max) - 200px);
    }

    article {
      :global(h2) {
        font-size: px-to-rem(80px);
        line-height: px-to-rem(80px);
      }

      :global(li),
      :global(p) {
        font-size: px-to-rem(40px);
        line-height: px-to-rem(52px);
      }

      :global(li) {
        padding: px-to-rem(20px);
      }

      :global(.hp--intro--img) {
        width: px-to-rem(300px);
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

      :global(ul) {
        margin: px-to-rem(56px) 0;
      }

      :global(.hp--list) :global(p) {
        font-size: px-to-rem(28px);
        line-height: px-to-rem(40px);
        padding: 0;
        letter-spacing: var(--font--type--letter-spacing);
      }
    }
  }
</style>
