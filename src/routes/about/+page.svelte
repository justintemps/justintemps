<script>
  import selfie from "$lib/assets/selfie.jpg";
</script>

<div class="container">
  <h1>A bit about me</h1>
  <figure>
    <img alt="Me holding a gavel in front of an ILO logo banner" src={selfie} />
    <figcaption>Bringing down the hammer of social justice</figcaption>
  </figure>
</div>

<style lang="scss">
  .container {
    width: 100%;
    max-width: var(--size--column);
    display: flex;
    flex-flow: column;
    gap: rem(36px);
  }

  h1 {
    color: var(--color--brand);
    font-size: rem(36px);
    padding-inline: 20px;
  }

  @include breakpoint(md) {
    h1 {
      padding-inline: 0;
    }
  }
</style>
