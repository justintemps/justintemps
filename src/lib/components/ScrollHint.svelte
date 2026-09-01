<script lang="ts">
  // A "there's more below" cue for the home page. Sits at the bottom of the
  // viewport until the visitor scrolls, then gets out of the way. Clicking it
  // scrolls the intro into view, which also kicks off its reveal animation.
  let scrollY = $state(0);
  const hidden = $derived(scrollY > 40);

  function scrollDown() {
    const target =
      document.querySelector<HTMLElement>(".hp--intro--img") ??
      document.querySelector<HTMLElement>(".hp--intro");
    // Headroom covers the intro's reveal, which lifts it ~40px as it lands.
    const top = target
      ? target.getBoundingClientRect().top + window.scrollY - 96
      : window.innerHeight * 0.85;
    window.scrollTo({ top, behavior: "smooth" });
  }
</script>

<svelte:window bind:scrollY />

<button
  class="scroll-hint"
  class:is-hidden={hidden}
  aria-label="Scroll down to read more"
  tabindex={hidden ? -1 : 0}
  onclick={scrollDown}
>
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
    <path
      d="M4 8.5 12 16.5 20 8.5"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>

<style lang="scss">
  .scroll-hint {
    position: fixed;
    bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
    left: 50%;
    translate: -50% 0;
    display: grid;
    place-items: center;
    width: 3.25rem;
    height: 3.25rem;
    padding: 0;
    border: 2px solid var(--color--brand);
    border-radius: 50%;
    // A translucent disc of sky so the chevron still reads as a control when
    // it lands on top of the ghosted portrait peeking up from below.
    background: rgba(25, 53, 73, 0.7);
    color: var(--color--brand);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition:
      opacity 0.3s ease,
      background-color 0.2s ease;

    &:hover {
      background: rgba(25, 53, 73, 0.9);
    }

    &:focus-visible {
      outline: 2px solid var(--color--brand);
      outline-offset: 2px;
    }

    &.is-hidden {
      opacity: 0;
      pointer-events: none;
    }

    svg {
      animation: bob 1.8s ease-in-out infinite;
    }
  }

  // Without JavaScript the button can't scroll anything, so don't show it.
  :global(html:not(.js)) .scroll-hint {
    display: none;
  }

  @keyframes bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(6px);
    }
  }
</style>
