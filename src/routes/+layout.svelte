<script>
  import "@fontsource/montserrat/400.css";
  import "@fontsource/montserrat/600.css";
  import "./app.scss";
  import Nav from "$lib/Nav.svelte";
</script>

<Nav>
  <main>
    <div>
      <slot />
    </div>
  </main>
</Nav>

<style lang="scss">
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: rem(20px);
    padding-block: rem(84px);
  }

  div {
    width: 100%;
    max-width: var(--size--content--max);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
