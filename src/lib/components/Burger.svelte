<script lang="ts">
  interface BurgerProps {
    open: boolean;
    onclick: () => void;
    className?: string;
    controlsId: string;
  }

  let { open, className, onclick, controlsId }: BurgerProps = $props();
</script>

<button
  aria-label="Toggle mobile menu"
  aria-expanded={open}
  aria-controls={controlsId}
  class={className}
  {onclick}
>
  <svg class:open viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#FFC600" stroke-width="12" stroke-linecap="square">
      <g class="line top"><path d="M 0,8 H 100" /></g>
      <path class="line middle" d="M 0,40 H 100" />
      <g class="line bottom"><path d="M 0,72 H 100" /></g>
    </g>
  </svg>
</button>

<style lang="scss">
  // Each stage gets half the menu's duration: opening slides the outer lines
  // to the middle, then rotates them into an X; closing runs that in reverse.
  // These are transitions rather than keyframe animations so nothing plays
  // when the button first renders.
  $stage: calc(var(--transition--duration--slow) / 2);

  button {
    width: 27px;
    height: 20px;
    background-color: transparent;
    border: none;
    padding: 0;
    outline-offset: 5px;
    cursor: pointer;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .line,
  .line path {
    transform-box: view-box;
    transition-duration: $stage;
    transition-timing-function: ease;
  }

  // The outer lines rotate around the centre of the X...
  .top,
  .bottom {
    transform-origin: 50px 40px;
    transition-property: transform;
    transition-delay: 0s;

    // ...and slide as a separate step on the path inside.
    path {
      transition-property: transform;
      transition-delay: $stage;
    }
  }

  .middle {
    transition-property: opacity;
    transition-delay: $stage;
  }

  .open {
    .top,
    .bottom {
      transition-delay: $stage;

      path {
        transition-delay: 0s;
      }
    }

    .top {
      transform: rotate(45deg);

      path {
        transform: translateY(32px);
      }
    }

    .bottom {
      transform: rotate(-45deg);

      path {
        transform: translateY(-32px);
      }
    }

    .middle {
      opacity: 0;
      transition-delay: 0s;
    }
  }
</style>
