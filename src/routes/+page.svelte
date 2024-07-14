<script lang="ts">
  import content, { metadata } from "$lib/content/pages/home.md";
  import Clouds from "$lib/components/Clouds.svelte";
</script>

<article>
  <Clouds />
  <h1>{metadata.title}</h1>
  <svelte:component this={content} />
</article>

<style lang="scss">
  .clouds {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }

  h1 {
    filter: drop-shadow(14px 13px 11px rgba(0, 0, 0, 0.5));
    font-weight: bold;
    font-size: rem(56px);
    line-height: rem(68px);
  }

  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: rem(44px);
    padding: 0 var(--size--edge--padding);

    :global(.hp--intro--img) {
      width: rem(200px);
      position: absolute;
      top: rem(-100px);
    }

    :global(.hp--intro) {
      display: flex;
      flex-direction: column;
      position: relative;
      justify-content: center;
      align-items: center;
      border: rem(4px) solid var(--color--brand);
      border-top: none;
      padding: rem(128px) rem(20px) rem(44px);
      margin-top: rem(80px);

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
        width: calc(50% - (#{rem(100px)} + 5%));
      }

      &:after {
        right: 0;
        width: calc(50% - (#{rem(100px)} + 5%));
      }
    }

    :global(h2) {
      filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
      font-weight: bold;
      font-size: rem(48px);
      line-height: rem(48px);
      text-align: center;
    }

    :global(p),
    :global(li) {
      font-size: rem(24px);
      line-height: rem(36px);
      text-align: center;
      font-family: var(--font--type);
    }

    :global(ul) {
      margin: rem(40px) 0;
    }

    :global(li) {
      list-style: none;
      padding: rem(4px) 0;
    }
  }

  @include breakpoint("md") {
    h1 {
      font-size: rem(136px);
      line-height: rem(148px);
      max-width: calc(var(--size--content--max) - 200px);
    }

    article {
      gap: rem(84px);

      :global(h2) {
        font-size: rem(80px);
        line-height: rem(80px);
      }

      :global(p),
      :global(li) {
        font-size: rem(40px);
        line-height: rem(52px);
        padding: rem(20px);
      }

      :global(.hp--intro--img) {
        width: rem(300px);
      }

      :global(.hp--intro) {
        padding: rem(226px) 13% rem(76px);
        margin-top: rem(130px);

        &:before {
          left: 0;
          width: calc(50% - (#{rem(150px)} + 5%));
        }

        &:after {
          right: 0;
          width: calc(50% - (#{rem(150px)} + 5%));
        }
      }

      :global(ul) {
        margin: rem(56px) 0;
      }

      :global(.hp--list) :global(p) {
        font-size: rem(28px);
        line-height: rem(40px);
        padding: 0;
        letter-spacing: var(--font--type--letter-spacing);
      }
    }
  }
</style>
