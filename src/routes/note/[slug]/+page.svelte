<script lang="ts">
  import { formatDate } from "$lib/utilities/formatDate.js";

  let { data } = $props();
</script>

<code><pre>{JSON.stringify(data, null, 4)}</pre></code>
