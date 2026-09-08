<script lang="ts">
  import content, { metadata } from "$lib/content/pages/home.md";
  import Clouds from "$lib/components/Clouds.svelte";
  import ScrollHint from "$lib/components/ScrollHint.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { page } from "$app/state";

  const { title, subtitle, description } = metadata;
</script>

<SEO {title} {subtitle} {description} url={page.url.pathname} />

<article>
  <Clouds />
  <h1>Justin time to blow your mind</h1>

  <svelte:component this={content} />
  <ScrollHint />
</article>

<style lang="scss">
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;

  h1 {
    filter: drop-shadow(14px 13px 11px rgba(0, 0, 0, 0.5));
    font-weight: 700;
    // Three caps on the fluid size. By height: on a wide, short laptop screen
    // the heading alone would otherwise fill the fold. By the column width: on
    // a phone the widest four-line split ("blow your") is 5.03em, so the
    // heading is never more than four lines; this only bites below ~430px,
    // where it meets the fluid scale.
    font-size: min(
      var(--text--4xl),
      15vh,
      calc((100vw - 2 * var(--size--edge--padding)) / 5.3)
    );
    line-height: 1.05;
  }

  article {
    max-width: 100%;
    // The home page breathes more than a standard page: the intro sits a
    // little further below the fold so the scroll hint has something to point
    // at, and the list keeps that same distance below the intro. The portrait
    // pokes up out of the intro box by --hp--overhang; the box makes room for
    // it below, so the visible gap heading -> portrait -> box -> list is even.
    --hp--gap: #{fluid(56px, 120px)};
    --hp--overhang: #{px-to-rem(96px)};
    gap: var(--hp--gap);
    @include edge-padding;

    // The portrait is an illustration exported at 3x (858x870) with the same
    // 286:290 proportions as the photo it replaced. The intrinsic size comes
    // from the width/height attributes; pinning the ratio here as well means
    // the box is reserved before the file arrives, so nothing shifts on load.
    :global(.hp--intro--img) {
      width: px-to-rem(200px);
      height: auto;
      aspect-ratio: 286 / 290;
      position: absolute;
      top: calc(-1 * var(--hp--overhang));
    }

    :global(.hp--intro) {
      display: flex;
      flex-direction: column;
      position: relative;
      justify-content: center;
      align-items: center;
      border: px-to-rem(4px) solid var(--color--brand);
      border-top: none;
      padding: px-to-rem(128px) px-to-rem(20px) px-to-rem(44px);
      margin-top: var(--hp--overhang);

      // The intro is a centred box, not running text: no flow spacing inside it.
      > :global(* + *) {
        margin-block-start: 0;
      }

      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 0;
        height: 4px;
        background-color: var(--color--brand);
      }

      &:before {
        left: 0;
        width: calc(50% - (#{px-to-rem(100px)} + 5%));
      }

      &:after {
        right: 0;
        width: calc(50% - (#{px-to-rem(100px)} + 5%));
      }
    }

    :global(h2) {
      filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
      font-weight: 700;
      font-size: var(--text--3xl);
      line-height: 1;
      text-align: center;
    }

    // Display copy for the home page only: same endpoints as before, now fluid.
    :global(p),
    :global(li) {
      font-size: #{fluid(24px, 40px)};
      line-height: var(--leading--snug);
      text-align: center;
      font-family: var(--font--type);
    }

    :global(ul) {
      margin-block: var(--space--block);
    }

    :global(li) {
      list-style: none;
      // Most links wrap to two lines on a phone, so the gap between items has
      // to beat the line height inside one (about 31px) or the list reads as
      // a single run of text.
      padding: var(--space--2) 0;
    }

    :global(.hp--list) :global(p) {
      font-size: var(--text--lg);
      line-height: var(--leading--body);
      padding: 0;
    }
  }

  @include breakpoint("md") {
    h1 {
      // Measured in the heading's own em so the three-line break survives any
      // font size. Anything from ~5.7em ("Justin time") to ~7.9em ("blow your
      // mind") forces three lines; text-wrap: balance then evens them out.
      max-width: 6.8em;
    }

    article {
      --hp--overhang: #{px-to-rem(132px)};

      :global(li) {
        padding: var(--space--3);
      }

      :global(.hp--intro--img) {
        width: px-to-rem(300px);
      }

      :global(.hp--intro) {
        padding: px-to-rem(200px) 13% px-to-rem(76px);

        &:before {
          left: 0;
          width: calc(50% - (#{px-to-rem(150px)} + 5%));
        }

        &:after {
          right: 0;
          width: calc(50% - (#{px-to-rem(150px)} + 5%));
        }
      }
    }
  }

  // Short viewports: the heading is already height-capped above; the gap
  // below it shrinks too so the portrait still peeks up from the fold.
  @include breakpoint(short) {
    article {
      --hp--gap: #{px-to-rem(64px)};
    }
  }

  // Scroll reveal for the intro. At rest it sits half-sunk in the cloud bank:
  // dim, blurred and a little lower, still visible enough to show there's more
  // below the fold. As it scrolls into view it rises and sharpens. The box
  // leads, the portrait follows, the words arrive last. Only the class
  // toggling is JS (see $lib/actions/reveal); the resting state is gated on
  // html.js (set in app.html) so nothing is dimmed without JavaScript, and
  // skipped entirely for reduced-motion visitors.
  @media (prefers-reduced-motion: no-preference) {
    $ease-emerge: cubic-bezier(0.33, 1, 0.68, 1);

    // On a phone the intro fills the screen the moment it is scrolled to, so
    // the half-sunk resting state and the rise never read as an effect. It
    // only plays from the md breakpoint up; below that the intro simply
    // renders in its final state (the class toggling is harmless).
    @include breakpoint(md) {
      :global(.hp--intro.reveal) {
        transition:
          opacity 0.7s $ease-emerge,
          transform 0.7s $ease-emerge,
          filter 0.7s $ease-emerge;

        :global(.hp--intro--img) {
          transition: transform 0.6s $ease-emerge 0.1s;
        }

        :global(p) {
          transition:
            opacity 0.6s $ease-emerge 0.2s,
            transform 0.6s $ease-emerge 0.2s;
        }
      }

      :global(html.js .hp--intro.reveal:not(.is-revealed)) {
        opacity: 0.45;
        transform: translateY(#{px-to-rem(40px)}) scale(0.98);
        filter: blur(8px);

        :global(.hp--intro--img) {
          transform: translateY(#{px-to-rem(24px)});
        }

        :global(p) {
          opacity: 0.6;
          transform: translateY(#{px-to-rem(16px)});
        }
      }
    }

    // The list below follows the same idea without the fog: the heading fades
    // up first and the links follow one after another. The sign-off has its
    // own trigger so it plays when it arrives, with a beat between its lines.
    :global(.hp--list.reveal) {
      :global(h2),
      :global(li) {
        transition:
          opacity 0.6s $ease-emerge,
          transform 0.6s $ease-emerge;
      }

      @for $i from 1 through 4 {
        :global(li:nth-child(#{$i})) {
          transition-delay: 0.15s + ($i - 1) * 0.1s;
        }
      }
    }

    :global(html.js .hp--list.reveal:not(.is-revealed)) {
      :global(h2),
      :global(li) {
        opacity: 0;
        transform: translateY(#{px-to-rem(24px)});
      }
    }

    :global(.hp--joke.reveal) {
      // Delays are set so that even when the list and the sign-off come into
      // view together, the last link has landed before the joke begins.
      :global(p) {
        transition:
          opacity 0.5s $ease-emerge 0.3s,
          transform 0.5s $ease-emerge 0.3s;
      }

      :global(p:last-child) {
        transition-delay: 1.1s;
      }
    }

    :global(html.js .hp--joke.reveal:not(.is-revealed)) {
      :global(p) {
        opacity: 0;
        transform: translateY(#{px-to-rem(16px)});
      }
    }
  }
</style>
