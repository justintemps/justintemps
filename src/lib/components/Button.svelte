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
  @use "$styles/mixins" as *;

  a {
    text-decoration: none;
  }

  button {
    @include pill;
    cursor: pointer;
    width: fit-content;

    &.button--active {
      background-color: var(--color--brand);
      color: var(--color--bg--accent);
    }
  }

  .button--size__small {
    @include pill-size(small);
  }

  .button--size__large {
    @include pill-size(large);
  }
</style>
