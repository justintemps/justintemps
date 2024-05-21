<script lang="ts">
  import classnames from "classnames";

  interface Props {
    selected?: Boolean;
  }

  let { selected }: Props = $props();
</script>

<li>
  <span class={classnames("home", "nav-item", { selected })}>
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.6491 10.5C19.6491 15.3315 15.7288 19.25 10.8907 19.25C6.05265 19.25 2.13239 15.3315 2.13239 10.5C2.13239 5.66849 6.05265 1.75 10.8907 1.75C15.7288 1.75 19.6491 5.66849 19.6491 10.5Z"
      />
      <path d="M10.8916 5.5V10.5" />
      <path d="M10.5618 10.5497L7.55464 10.5497" />
    </svg>
    <a aria-label="home" href="/">justintemps</a>
  </span>
</li>

<style lang="scss">
  @mixin color-stroke($color) {
    stroke: $color;
    color: $color;
  }

  .home {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    flex: 1 1 auto;
    gap: rem(6px);
    @include color-stroke(var(--color--brand));
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  path {
    stroke: inherit;
    stroke-width: 2.25;
    stroke-linecap: "round";
  }

  @media (min-width: 768px) {
    .home {
      @include color-stroke(var(--color--accent));

      &.selected {
        @include color-stroke(var(--color--brand));
        a {
          @include nav-item-selected-decoration;
        }
      }

      &:hover {
        @include color-stroke(var(--color--brand));
      }
    }
  }
</style>
