<script lang="ts">
  import { browser } from "$app/environment";

  if (browser) {
    import("altcha");
  }

  export let value: string = "";

  const altchaStrings = {
    ariaLinkLabel: "Visit Altcha.org",
    error: "Verification failed. Try again later.",
    expired: "Verification expired. Try again.",
    footer:
      'Protected by <a href="https://altcha.org/" target="_blank" aria-label="Visit Altcha.org">ALTCHA</a>',
    label: "Promise you're not a robot",
    verified: "Ok, I believe you",
    verifying: "Making sure...",
    waitAlert: "Still checking... please wait."
  };

  const strings = JSON.stringify(altchaStrings);
</script>

<altcha-widget
  {strings}
  debug
  challengeurl="/api/altcha"
  onstatechange={(ev) => {
    const { payload, state } = ev.detail;
    if (state === "verified" && payload) {
      value = payload;
    } else {
      value = "";
    }
  }}
></altcha-widget>

<style lang="scss">
  @use "$styles/functions" as *;

  :global(altcha-widget) {
    border: none;

    :global(.altcha) {
      border: none !important;
    }

    :global(.altcha-main) {
      padding: 0 !important;
    }

    :global(label) {
      color: var(--color--brand);
    }

    :global(.altcha-label) {
      flex-grow: 0 !important;
      font-family: var(--font--display);
      font-size: #{px-to-rem(20px)};
      color: var(--color--brand);
    }

    :global(.altcha-logo) {
      opacity: 1 !important;
      color: var(--color--brand) !important;
    }

    :global(input) {
      accent-color: var(--color--brand) !important;
      border-radius: 0 !important;
    }

    :global(.altcha-footer) {
      display: none !important;
    }

    --altcha-border-width: 1px;
    --altcha-border-radius: 0;
    --altcha-color-base: var(--color--bg--main);
    --altcha-color-border: var(--color--brand);
    --altcha-color-border-focus: var(--color--brand);
    --altcha-color-text: var(--color--type);
    --altcha-color-error-text: var(--color--brand);
    --altcha-color-footer-bg: var(--color--bg--main);
    --altcha-max-width: 400px;
  }
</style>
