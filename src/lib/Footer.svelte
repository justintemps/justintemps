<script lang="ts">
  import Social from "./social/Social.svelte";

  let year = new Date().getFullYear();
</script>

<footer>
  <div class="footer-social">
    <p class="footer-social--cta">Let's connect if you want</p>
    <Social />
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

  .footer-social {
    display: none;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    &--cta {
      width: 100%;
      text-align: center;
      padding-bottom: rem(20px);
      margin-bottom: rem(20px);
      border-bottom: rem(4px) solid var(--color--brand);
      font-size: rem(20px);
    }
  }

  p {
    color: var(--color--brand);
    font-family: var(--font--display);
    font-size: rem(16px);
  }

  @include breakpoint(lg) {
    footer {
      gap: rem(80px);
      padding-block: rem(60px);
    }

    .footer-social {
      display: flex;
    }
  }
</style>
