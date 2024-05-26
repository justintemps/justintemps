<script lang="ts">
  let year = new Date().getFullYear();
</script>

<footer>
  <p>Justin E. Smith © {year}</p>
</footer>

<style lang="scss">
  footer {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color--bg--accent);
    border-top: rem(4px) solid var(--color--brand);
  }

  p {
    color: var(--color--brand);
    font-family: var(--font--display);
  }
</style>
