<script lang="ts">
  interface Props {
    label: string;
    type: "submit" | "reset" | "button";
    name: string;
    size: "small" | "large";
  }

  const { type, label, name, size = "small" }: Props = $props();
</script>

<button {type} {name} class="button--size__{size}">{label}</button>

<style lang="scss">
  @use "$styles/functions" as *;
  button {
    background-color: var(--color--background);
    color: var(--color--accent);
    border: var(--color--accent) 1px solid;
    cursor: pointer;
    transition: all ease-in-out 150ms;
    width: fit-content;
  }

  .button {
    &--size {
      &__small {
        font-size: px-to-rem(16px);
        padding: px-to-rem(8px) px-to-rem(12px);
      }

      &__large {
        font-size: px-to-rem(20px);
        padding: px-to-rem(12px) px-to-rem(16px);
      }
    }
  }

  button:hover {
    background-color: var(--color--brand);
    color: var(--color--background);
  }
</style>
