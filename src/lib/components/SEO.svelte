<script lang="ts">
  const VITE_DOMAIN = import.meta.env.VITE_DOMAIN;

  interface Props {
    title: string;
    subtitle?: string;
    description: string;
    url: string;
  }

  let { title, description, url, subtitle = "Justin Smith" }: Props = $props();

  function formatUrl(url: string) {
    if (url === "/") return `${VITE_DOMAIN}`;
    return `${VITE_DOMAIN}${url}`;
  }

  function formatTitle(title: string, subtitle?: string) {
    if (subtitle && title) {
      return `${title} | ${subtitle}`;
    }
    return title;
  }

  const formattedTitle = formatTitle(title, subtitle);
  const canonical = formatUrl(url);
</script>

<svelte:head>
  <title>{formattedTitle}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="/images/og-image.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={subtitle} />
  <meta property="og:url" content={canonical} />
  <link rel="canonical" href={canonical} />
</svelte:head>
