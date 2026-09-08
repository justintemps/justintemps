<script lang="ts">
  import Tags from "$lib/components/Tags.svelte";
  import type { Post } from "$lib/types";

  const { title, slug, tags, date, description }: Post = $props();

  // The date is the entry's visual anchor, the way the screenshot is on the
  // work page: a big day numeral with the month and year tucked under it.
  const when = $derived(new Date(date));
  const day = $derived(when.toLocaleDateString("en-GB", { day: "2-digit" }));
  const monthYear = $derived(
    when.toLocaleDateString("en-GB", { month: "short", year: "numeric" })
  );
</script>

<article>
  <time datetime={date}>
    <span class="day">{day}</span>
    <span class="month">{monthYear}</span>
  </time>
  <div class="entry">
    <h2><a href={`/note/${slug}`}>{title}</a></h2>
    <p>{description}</p>
    <div class="tags">
      <Tags {tags} />
    </div>
  </div>
</article>

<style lang="scss">
  @use "$styles/functions" as *;
  @use "$styles/mixins" as *;

  // Each note is a row in a ledger: date stamp on the left, the entry on the
  // right. Below the md breakpoint the stamp folds up into a single line
  // above the title so the text keeps the full column width.
  article {
    position: relative;
    display: flex;
    flex-flow: column;
    gap: var(--space--2);

    @include breakpoint(md) {
      display: grid;
      grid-template-columns: #{px-to-rem(96px)} 1fr;
      gap: var(--space--4);
      align-items: start;
    }
  }

  // Below md the stamp is one line of meta text, sized like the "Last
  // Update" line on the notes themselves. From md up the day becomes a big
  // numeral with the month and year tucked under it.
  time {
    display: flex;
    align-items: baseline;
    gap: 0.35em;
    font-family: var(--font--display);
    font-size: var(--text--xs);
    line-height: var(--leading--meta);
    color: var(--color--brand);

    @include breakpoint(md) {
      flex-flow: column;
      gap: var(--space--1);
      line-height: 1;
      // Nudges the numeral's cap height onto the title's first line.
      padding-block-start: 0.1em;
    }
  }

  .day {
    @include breakpoint(md) {
      font-size: var(--text--xl);
      font-weight: 700;
      letter-spacing: var(--tracking--tight);
    }
  }

  .month {
    @include breakpoint(md) {
      line-height: var(--leading--meta);
      color: var(--color--accent);
    }
  }

  // The entry is a cluster spaced like the work-page captions: title, lede,
  // meta. The title is the only link, but a pseudo-element stretches it over
  // the whole row so anywhere on the entry is a target; the tags sit above it
  // so they stay clickable in their own right. The lede is set in the serif
  // reading face, since these are pieces of writing rather than captions.
  .entry {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    gap: var(--space--2);
  }

  h2 {
    font-size: var(--text--lg);
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color var(--transition--duration--fast) ease-in;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
    }

    // Hover and keyboard focus share one state: brand colour plus the same
    // underline the nav uses for the current page.
    &:hover,
    &:focus-visible {
      @include nav-item-selected-decoration;
      color: var(--color--brand);
      outline: none;
    }
  }

  p {
    max-width: 62ch;
    font-family: var(--font--type);
    font-size: var(--text--md);
    line-height: var(--leading--body);
  }

  .tags {
    position: relative;
    z-index: 1;
    margin-block-start: var(--space--1);
  }
</style>
