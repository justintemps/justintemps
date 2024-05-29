<script lang="ts">
  import Connect from "./connect/connect.svelte";

  let year = new Date().getFullYear();
</script>

<footer>
  <div class="footer--connect">
    <Connect heading="Let's connect if you want" />
  </div>
  <p class="copyright">Justin E. Smith © {year}</p>
</footer>

<style lang="scss">
  footer {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background: var(--color--bg--accent);
    border-top: rem(4px) solid var(--color--brand);
    padding-block: rem(32px);
  }

  .footer--connect {
    display: none;
  }

  p {
    color: var(--color--brand);
    font-family: var(--font--display);
    font-size: rem(16px);
  }

  @include breakpoint(lg) {
    footer {
      gap: rem(60px);
      padding-block: rem(60px);
    }

    .footer--connect {
      display: flex;
      width: 100%;
      max-width: rem(400px);
    }

    .footer-social {
      display: flex;
    }
  }
</style>
