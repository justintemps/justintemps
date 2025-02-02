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
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;
  .connect {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    &--heading {
      width: 100%;
      text-align: center;
      padding-bottom: px-to-rem(20px);
      margin-bottom: px-to-rem(20px);
      border-bottom: px-to-rem(4px) solid var(--color--brand);
      font-size: px-to-rem(24px);
      font-family: var(--font--display);
      color: var(--color--brand);
    }
  }

  @include breakpoint(lg) {
    .connect--heading {
      font-size: px-to-rem(20px);
    }
  }
</style>
