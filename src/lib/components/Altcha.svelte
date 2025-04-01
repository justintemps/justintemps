<script lang="ts">
  import { browser } from "$app/environment";

  if (browser) {
    import("altcha");
  }

  export let value: string = "";
</script>

<altcha-widget
  style="--altcha-max-width:100%"
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
