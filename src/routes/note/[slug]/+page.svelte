<script lang="ts">
  let { data } = $props();
  const { title } = data.meta;

  let Component = data.content;
</script>

<article>
  <h1>{title}</h1>
  <Component />
</article>
