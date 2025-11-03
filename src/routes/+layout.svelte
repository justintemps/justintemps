<script lang="ts">
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import "@fontsource/montserrat/400.css";
  import "@fontsource/montserrat/500.css";
  import "@fontsource/montserrat/600.css";
  import "@fontsource/crimson-text/400.css";
  import "@fontsource/crimson-text/600.css";
  import "$styles/global.scss";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";

  injectAnalytics({ mode: dev ? "development" : "production" });
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

  @include breakpoint(md) {
    main {
      padding-block: px-to-rem(84px);
    }
  }
</style>
