<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { metadata } from "$lib/content/pages/contact.md";
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";
  import Altcha from "$lib/components/Altcha.svelte";
  import { page } from "$app/state";
  let { form }: PageProps = $props();
</script>

<SEO
  title={metadata.title}
  description={metadata.description}
  url={page.url.pathname}
/>

<article>
  {#if form?.success}
    <hgroup>
      <h1>Success!</h1>
      <p>
        Your message has been sent. I'll get back to you as soon as possible.
      </p>
    </hgroup>
  {/if}

  {#if form?.error}
    <hgroup>
      <h1>Something went wrong</h1>
      <p>
        There was an error and I did not receive your message. Better hit me up
        on social media instead.
      </p>
    </hgroup>
  {/if}

  {#if !form}
    <hgroup>
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>
    </hgroup>
    <section>
      <form method="POST" action="/contact" use:enhance>
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
        <Altcha />
        <Button size="large" type="submit" label="Submit" name="submit" />
      </form>
    </section>
  {/if}
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
    font-family: var(--font--type);
    color: var(--color--bg--accent);
    font-weight: 600;
    font-size: px-to-rem(24px);
    line-height: 1.5;
  }

  textarea {
    min-height: px-to-rem(248px);
  }
</style>
