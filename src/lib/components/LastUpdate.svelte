<script lang="ts">
  import { formatDate } from "$lib/utilities/formatDate";

  interface Props {
    date: string;
  }

  let { date }: Props = $props();
</script>

<p><span>Last Update</span>{formatDate(date)}</p>

<style lang="scss">
  @use "$styles/functions" as *;

  p {
    font-family: var(--font--display);
    font-size: px-to-rem(16px);
  }

  span {
    color: var(--color--brand);
    &:after {
      content: "|";
      padding-inline: px-to-rem(8px);
    }
  }
</style>
