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
    <button type="submit">Submit</button>
  </form>
</article>

<style lang="scss">
  h1 {
    margin-bottom: rem(24px);
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
    padding: rem(12px) rem(8px);
    margin: rem(12px) 0 0 0;
  }

  textarea {
    min-height: rem(248px);
  }
</style>
