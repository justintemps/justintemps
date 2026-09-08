<script lang="ts">
  import type { Picture } from "vite-imagetools";

  interface Props {
    title: string;
    description: string;
    image: string;
    url: string;
  }

  const { image, title, description, url }: Props = $props();

  // Screenshots live in the asset pipeline so enhanced-img can emit
  // responsive avif/webp variants; the markdown only names the file.
  const shots = import.meta.glob<Picture>(
    "/src/lib/assets/images/work/*.{png,jpg}",
    { query: { enhanced: true }, eager: true, import: "default" }
  );
  const shot = $derived(shots[`/src/lib/assets/images/work/${image}`]);

  const host = $derived(new URL(url).hostname);
</script>

<article>
  <figure>
    <enhanced:img
      src={shot}
      alt={`Screenshot of ${title}`}
      sizes="(min-width: 768px) 768px, 100vw"
    />
  </figure>
  <div class="caption">
    <h2>{title}</h2>
    <p>{description}</p>
    <a href={url} target="_blank" rel="noopener noreferrer">{host}</a>
  </div>
</article>

<style lang="scss">
  @use "$styles/functions" as *;
  @use "$styles/mixins" as *;

  article {
    display: flex;
    flex-flow: column;
    gap: var(--space--3);
  }

  figure {
    border: px-to-rem(2px) solid var(--color--bg--accent);
    background-color: var(--color--bg--accent);
    box-shadow: 8px 8px 12px var(--color--shadow);

    :global(picture),
    :global(img) {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  // The caption is a cluster in the display face, spaced like the page
  // header (title, lede, meta) and sized off the same steps the note cards
  // use: lg for the title, sm for the copy, xs for the link. Only the link is
  // clickable; it is the project's domain, drawn as the same small pill as
  // the site's buttons and tags. The description keeps a measure a little
  // narrower than the screenshot so it reads as a caption, not a column.
  .caption {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    gap: var(--space--2);
  }

  h2 {
    font-size: var(--text--lg);
  }

  p {
    max-width: 62ch;
    font-family: var(--font--display);
    font-size: var(--text--sm);
    line-height: var(--leading--meta);
  }

  a {
    @include pill;
    @include pill-size(small);

    // A chevron marks the link as leading off-site; it is decorative, so it
    // lives in CSS rather than the link text.
    &::after {
      content: "\203A";
      margin-inline-start: px-to-rem(6px);
      font-size: 1.4em;
      line-height: 0;
      vertical-align: -0.08em;
    }
  }
</style>
