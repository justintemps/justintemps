<script lang="ts">
  interface Props {
    label: string;
    type: "submit" | "reset" | "button";
    href?: string;
    name: string;
    size: "small" | "large";
    active?: boolean;
    onclick?: (e: MouseEvent) => void;
  }

  const {
    type,
    label,
    name,
    size = "small",
    href,
    active = false,
    onclick
  }: Props = $props();
</script>

{#if href}
  <a {href}>
    <button
      {type}
      {name}
      class="button--size__{size} {active && 'button--active'}">{label}</button
    >
  </a>
{:else}
  <button
    {type}
    {name}
    {onclick}
    class="button--size__{size} {active && 'button--active'}">{label}</button
  >
{/if}

<style lang="scss">
  @use "$styles/functions" as *;

  a {
    text-decoration: none;
  }

  button {
    background-color: transparent;
    color: var(--color--accent);
    border: var(--color--accent) 1px solid;
    cursor: pointer;
    transition: all ease-in-out 150ms;
    width: fit-content;

    &:hover,
    &.button--active {
      background-color: var(--color--brand);
      color: var(--color--bg--accent);
    }
  }

  .button {
    &--size {
      &__small {
        font-size: px-to-rem(14px);
        padding: px-to-rem(8px) px-to-rem(10px);
      }

      &__large {
        font-size: px-to-rem(20px);
        padding: px-to-rem(12px) px-to-rem(16px);
      }
    }
  }
</style>
