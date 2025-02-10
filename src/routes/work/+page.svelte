<script lang="ts">
  import work from "$lib/content/pages/work.json";
  import Button from "$lib/components/Button.svelte";
</script>

<article class="work">
  <hrgroup>
    <h1>{work.title}</h1>
  </hrgroup>
  <section>
    <ul>
      {#each work.projects as project}
        <li>
          <article class="project">
            <h2>{project.title}</h2>
            <img src={project.image} alt={project.title} />
            <div class="description">
              <p>{project.description}</p>
              <Button
                size="large"
                name="Visit the project"
                label="Check it out"
              />
            </div>
          </article>
        </li>
      {/each}
    </ul>
  </section>
</article>

<style lang="scss">
  @use "$styles/functions" as *;

  hrgroup {
    max-width: var(--size--column--lg);
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: px-to-rem(60px);
  }

  .project {
    display: grid;
    border: px-to-rem(4px) solid var(--color--brand);
    padding: px-to-rem(24px);
    grid-template-columns: 40% 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "title title"
      "image description";
    text-decoration: none;
    gap: px-to-rem(24px);
  }

  h2 {
    grid-area: title;
    padding-block: px-to-rem(10px);
    position: relative;
  }

  img {
    grid-area: image;
  }

  .description {
    grid-area: description;
    display: flex;
    flex-direction: column;
    gap: px-to-rem(24px);
    justify-content: space-between;
  }

  p {
    font-family: var(--font-display);
    font-size: px-to-rem(20px);
  }

  :global(button) {
    align-self: flex-end;
  }
</style>
