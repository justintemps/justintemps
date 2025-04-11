<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";

  interface Props {
    label: string;
  }

  // Component state
  let href = $state("/notes");
  let isActive = $state(false);

  // Get the tags from the URL
  const searchParams = $derived(page.url.searchParams);

  // Get the label from the props
  const { label }: Props = $props();

  $effect(() => {
    // Encode the label
    const encodedLabel = encodeURIComponent(label.toLowerCase());

    // Get the query tags from the URL
    const queryTags = searchParams.get("tags");

    // Split the query tags into an array
    const queryTagsArray = queryTags?.split(",") || [];

    // Check if the tag is in the query tags
    isActive = !!queryTagsArray.includes(encodedLabel);

    // Get the href for the tag
    const getHref = () => {
      if (isActive) {
        const newQueryTagsArray = queryTagsArray.filter(
          (tag) => tag !== encodedLabel
        );

        return newQueryTagsArray.length === 0
          ? `/notes`
          : `/notes?tags=${newQueryTagsArray.join(",")}`;
      }

      return `/notes?tags=${[...queryTagsArray, encodedLabel].join(",")}`;
    };

    href = getHref();

    console.log({
      label,
      encodedLabel,
      queryTagsArray,
      href,
      isActive,
      searchParams
    });
  });
</script>

<Button
  size="small"
  {label}
  type="button"
  name={label}
  active={isActive}
  onclick={(e) => {
    e.preventDefault();
    goto(href);
  }}
/>
