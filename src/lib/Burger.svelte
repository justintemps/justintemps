<script lang="ts">
  import classnames from "classnames";

  interface BurgerProps {
    open: boolean;
    onclick: () => void;
    className?: string;
  }

  let { open, className, onclick }: BurgerProps = $props();
</script>

<button class={className} {onclick}>
  <svg
    class={classnames({ open, closed: !open })}
    viewBox="0 0 100 80"
    xmlns="http://www.w3.org/2000/svg"
    style="width: 100%; height: 100%;"
  >
    <g stroke="#FFC600" stroke-width="12" stroke-linecap="square">
      <path d="M 0,8 H 100" />
      <path d="M 0,40 H 100" />
      <path d="M 0,72 H 100" />
    </g>
  </svg>
</button>

<style lang="scss">
  @keyframes top-line-open {
    0% {
      transform: translate(0, 0) rotate(0);
    }
    50% {
      transform: translate(0, 32px) rotate(0);
    }
    100% {
      transform: translate(0, 32px) rotate(45deg);
    }
  }

  @keyframes top-line-close {
    0% {
      transform: translate(0, 32px) rotate(45deg);
    }
    50% {
      transform: translate(0, 32px) rotate(0);
    }
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }

  @keyframes bottom-line-open {
    0% {
      transform: translate(0, 0) rotate(0);
    }
    50% {
      transform: translate(0, -32px) rotate(0);
    }
    100% {
      transform: translate(0, -32px) rotate(-45deg);
    }
  }

  @keyframes bottom-line-close {
    0% {
      transform: translate(0, -32px) rotate(-45deg);
    }
    50% {
      transform: translate(0, -32px) rotate(0);
    }
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }

  @keyframes middle-line-open {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes middle-line-close {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  button {
    width: 27px;
    height: 20px;
    background-color: transparent;
    border: none;
    padding: 0;
    outline-offset: 5px;
    z-index: 5;
    cursor: pointer;
  }

  g {
    path {
      animation-duration: 300ms;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
      transform-box: view-box;

      &:first-child {
        transform-origin: center 8px;
      }

      &:last-child {
        transform-origin: center 72px;
      }
    }
  }

  .open {
    path {
      &:first-child {
        animation-name: top-line-open;
      }
      &:nth-child(2) {
        animation-name: middle-line-open;
      }
      &:last-child {
        animation-name: bottom-line-open;
      }
    }
  }

  .closed {
    path {
      &:first-child {
        animation-name: top-line-close;
      }
      &:nth-child(2) {
        animation-name: middle-line-close;
      }
      &:last-child {
        animation-name: bottom-line-close;
      }
    }
  }
</style>
