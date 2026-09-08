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
      <h1>Message sent</h1>
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
        <label class="half">
          Name
          <input type="text" name="name" autocomplete="name" required />
        </label>
        <label class="half">
          Email
          <input type="email" name="email" autocomplete="email" required />
        </label>
        <label>
          Message
          <textarea name="message" rows="4" required></textarea>
        </label>
        <Altcha />
        <Button
          size="large"
          type="submit"
          label="Send message"
          name="submit"
        />
      </form>
    </section>
  {/if}
</article>

<style lang="scss">
  @use "$styles/functions" as *;
  @use "$styles/mixins" as *;

  // A single column on phones. From tablet up, name and email share a row so
  // the form is one row shorter and neither short answer gets a 768px box.
  // Everything else (message, captcha, button) spans the full width.
  form {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space--4) var(--space--3);

    > :global(*) {
      grid-column: 1 / -1;
    }

    @include breakpoint(md) {
      grid-template-columns: 1fr 1fr;

      > .half {
        grid-column: span 1;
      }
    }
  }

  // Label sits tight against its field so the pair reads as one unit; the
  // grid gap does the separating between fields.
  label {
    display: flex;
    flex-flow: column;
    gap: var(--space--1);
  }

  // Fields use the same outlined-on-navy treatment as the button, tags and
  // the captcha checkbox, so the whole form reads as one piece. Typed text
  // is set like body copy, not bold.
  input,
  textarea {
    width: 100%;
    padding: px-to-rem(12px) px-to-rem(16px);
    background-color: transparent;
    border: px-to-rem(1px) solid var(--color--accent);
    border-radius: 0;
    font-family: var(--font--type);
    font-weight: 400;
  }

  textarea {
    min-height: px-to-rem(160px);
    resize: vertical;
  }
</style>
