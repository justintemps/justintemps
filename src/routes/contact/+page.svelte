<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { metadata } from "$lib/content/pages/contact.md";
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";

  let { form }: PageProps = $props();
</script>

<SEO {...metadata} />

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
    font-size: px-to-rem(24px);
    line-height: 1.5;
  }

  textarea {
    min-height: px-to-rem(248px);
  }
</style>
