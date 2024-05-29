<script>
  import "@fontsource/montserrat/400.css";
  import "@fontsource/montserrat/600.css";
  import "./app.scss";
  import Nav from "$lib/nav.svelte";
  import Footer from "$lib/footer.svelte";
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
    align-items: center;
    padding-inline: rem(20px);
    padding-block: rem(84px);
  }

  .wrapper {
    width: 100%;
    max-width: var(--size--content--max);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
