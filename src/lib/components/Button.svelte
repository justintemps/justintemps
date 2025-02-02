<script lang="ts">
  interface Props {
    label: string;
    type: "submit" | "reset" | "button";
    name: string;
  }

  const { type, label, name }: Props = $props();
</script>

<button {type} {name}>{label}</button>

<style lang="scss">
  button {
    background-color: var(--color--background);
    color: var(--color--accent);
    border: var(--color--accent) 1px solid;
    padding: px-to-rem(12px) px-to-rem(16px);
    cursor: pointer;
    font-size: px-to-rem(20px);
    transition: all ease-in-out 150ms;
    width: fit-content;
  }

  button:hover {
    background-color: var(--color--brand);
    color: var(--color--background);
  }
</style>
