<script lang="ts">
  import "@fontsource/montserrat/400.css";
  import "@fontsource/montserrat/500.css";
  import "@fontsource/montserrat/600.css";
  import "@fontsource/crimson-text/400.css";
  import "@fontsource/crimson-text/600.css";
  import "$styles/global.scss";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<Nav>
  <div class="layout">
    <main>
      <div class="wrapper">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</Nav>

<style lang="scss">
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;
  body {
    background-color: red !important;
  }
  .layout {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-block: px-to-rem(36px);
  }

  .wrapper {
    width: 100%;
    max-width: var(--size--content--max);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(article) {
    width: 100%;
    max-width: var(--size--column--lg);
    display: flex;
    flex-flow: column;
    gap: px-to-rem(40px);
  }

  :global(article.article--large) {
    max-width: 100%;
    padding: 0 var(--size--edge--padding);
    gap: px-to-rem(60px);

    @include breakpoint("md") {
      gap: px-to-rem(84px);
    }
  }

  :global(section) {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(24px);
    padding-inline: var(--size--edge--padding);
  }

  @include breakpoint(md) {
    main {
      padding-block: px-to-rem(84px);
    }

    :global(article) {
      gap: px-to-rem(64px);
    }
  }
</style>
