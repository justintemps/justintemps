<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { metadata } from "$lib/content/pages/contact.md";
  import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();
</script>

<SEO {...metadata} />

{#if form?.success}
  <p>Your message has been sent!</p>
{/if}

<article>
  <hgroup>
    <h1>{metadata.title}</h1>
    <p>{metadata.description}</p>
  </hgroup>
  <section>
    <form method="POST" action="/contact">
      <label>
        Your name
        <input type="text" name="name" required />
      </label>
      <label>
        Your email address
        <input type="email" name="email" required />
      </label>
      <label>
        Your message
        <textarea name="message" required></textarea>
      </label>
      <Button size="large" type="submit" label="Submit" name="submit" />
    </form>
  </section>
</article>

<style lang="scss">
  @use "$styles/functions" as *;
  form {
    gap: 40px;
  }
  form,
  label {
    display: flex;
    flex-flow: column;
  }

  input,
  textarea {
    padding: px-to-rem(12px) px-to-rem(8px);
    margin: px-to-rem(12px) 0 0 0;
  }

  textarea {
    min-height: px-to-rem(248px);
  }
</style>
