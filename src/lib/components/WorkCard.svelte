<script lang="ts">
  interface Props {
    title: string;
    description: string;
    image: string;
    url: string;
  }

  const { image, title, description, url }: Props = $props();
</script>

<article>
  <a href={url} target="_blank" rel="noopener noreferrer">
    <img src={image} alt={title} />
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </a>
</article>

<style lang="scss">
  @use "$styles/functions" as *;

  article,
  a {
    height: 100%;
    width: 100%;
  }

  a {
    display: inline-block;
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
    font-size: var(--text--lg);
    color: var(--color--brand);
    margin-bottom: var(--space--3);
  }

  p {
    font-family: var(--font--display);
    font-size: var(--text--sm);
    line-height: var(--leading--meta);
  }
</style>
