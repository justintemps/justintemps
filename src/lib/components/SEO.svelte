<script lang="ts">
  interface Props {
    title: string;
    subtitle?: string;
    description: string;
    url: string;
  }

  let { title, description, url, subtitle = "Justin Smith" }: Props = $props();
</script>

<svelte:head>
  <title>{title} | {subtitle}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="/images/og-image.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={subtitle} />
  <meta property="og:url" content={url} />
</svelte:head>
