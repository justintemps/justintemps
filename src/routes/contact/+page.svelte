<script lang="ts">
  import Button from "$lib/components/Button.svelte";
</script>

<article>
  <div>
    <h1>Get in touch</h1>
    <h2>
      Fill out the form to shoot me an email. I’ll get back to you as soon as I can.
    </h2>
  </div>
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
    <Button type="submit" label="Submit" name="submit" />
  </form>
</article>

<style lang="scss">
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;
  h1 {
    margin-bottom: px-to-rem(24px);
  }
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
