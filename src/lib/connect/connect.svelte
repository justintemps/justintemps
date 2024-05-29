<script lang="ts">
  import Social from "./social.svelte";

  interface Props {
    heading: String;
  }

  const { heading }: Props = $props();
</script>

<div class="connect">
  <p class="connect--heading">{heading}</p>
  <Social />
</div>

<style lang="scss">
  .connect {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    &--heading {
      width: 100%;
      text-align: center;
      padding-bottom: rem(20px);
      margin-bottom: rem(20px);
      border-bottom: rem(4px) solid var(--color--brand);
      font-size: rem(24px);
      font-family: var(--font--display);
      color: var(--color--brand);
    }
  }

  @include breakpoint(lg) {
    .connect--heading {
      font-size: rem(20px);
    }
  }
</style>
