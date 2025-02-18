<script lang="ts">
  import classnames from "classnames";

  interface Props {
    selected?: Boolean;
    onclick?: () => void;
  }

  let { selected, onclick }: Props = $props();
</script>

<li>
  <span class={classnames("home", "nav-item", { selected })}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 11.4854V5.33334H11V12.5146L15.3077 15.5915L16.4701 13.9641L13 11.4854Z"
        stroke-width="0.5"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22 12C22 17.5229 17.5228 22 12 22C6.47715 22 2 17.5229 2 12C2 6.47717 6.47715 2.00002 12 2.00002C17.5228 2.00002 22 6.47717 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58174 7.58172 4.00002 12 4.00002C16.4183 4.00002 20 7.58174 20 12Z"
        stroke-width="0.5"
      />
    </svg>

    <a aria-label="home" href="/" {onclick}>justintemps</a>
  </span>
</li>

<style lang="scss">
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;

  @mixin color-stroke($color) {
    stroke: $color;
    fill: $color;
    color: $color;
  }

  .home {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    flex: 1 1 auto;
    gap: px-to-rem(6px);
    @include color-stroke(var(--color--accent));

    &.selected {
      @include color-stroke(var(--color--brand));
    }

    path {
      stroke: inherit;
      fill: inherit;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
  }

  @include breakpoint(lg) {
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
