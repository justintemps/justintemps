<script lang="ts">
  interface Props {
    title: string;
    description: string;
    image: string;
    url: string;
  }

  const { image, title, description, url }: Props = $props();
</script>

<a href={url} target="_blank" rel="noopener noreferrer">
  <img src={image} alt={title} />
  <div>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
</a>

<style lang="scss">
  @use "$styles/functions" as *;

  a {
    display: inline-block;
    height: 100%;
    width: 100%;
    background-color: var(--color--bg--accent);
    border: px-to-rem(2px) solid var(--color--bg--accent);
    box-shadow: 8px 8px 12px var(--color--shadow);
    transition: outline 150ms ease-in-out;
    text-decoration: none;

    &:hover,
    &:focus {
      outline: px-to-rem(4px) solid var(--color--brand);
      outline-offset: px-to-rem(4px);
    }
  }

  img {
    overflow: hidden;
    width: 100%;
  }

  div {
    padding: px-to-rem(24px);
  }

  h2 {
    position: relative;
    font-size: px-to-rem(28px);
    color: var(--color--brand);
    margin-bottom: px-to-rem(24px);
  }

  p {
    font-family: var(--font-display);
    font-size: px-to-rem(18px);
    line-height: px-to-rem(28px);
    letter-spacing: initial;
  }
</style>
