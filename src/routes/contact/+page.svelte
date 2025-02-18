<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { metadata } from "$lib/content/pages/contact.md";
</script>

<SEO {...metadata} />

<article>
  <hgroup>
    <h1>{metadata.title}</h1>
    <p>{metadata.description}</p>
  </hgroup>
  <section>
    <form>
      <label>
        Your name
        <input type="text" required />
      </label>
      <label>
        Your email address
        <input type="text" required />
      </label>
      <label>
        Your message
        <textarea required></textarea>
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
