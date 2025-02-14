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
            <img src={project.image} alt={project.title} />
            <div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </article>
        </li>
      {/each}
    </ul>
  </section>
</article>

<style lang="scss">
  @use "$styles/functions" as *;

  article.work {
    max-width: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }

  hrgroup {
    max-width: var(--size--column--lg);
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: px-to-rem(56px);
  }

  article.project {
    display: grid;
    gap: 0;
    height: 100%;
    background-color: var(--color--bg--accent);
    padding-bottom: px-to-rem(24px);
    border: px-to-rem(2px) solid var(--color--type);
    grid-template-columns: 25px 1fr 25px;
    grid-template-rows: minmax(auto, 230px) auto;
    grid-template-areas:
      "image image image"
      ". content .";

    div {
      grid-area: content;
    }

    img {
      grid-area: image;
      overflow: hidden;
    }
  }

  h2 {
    position: relative;
    font-size: px-to-rem(24px);
    grid-area: title;
    color: var(--color--brand);
    padding: px-to-rem(24px) 0;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(24px);
    justify-content: space-between;
    grid-area: description;
  }

  p {
    font-family: var(--font-display);
    font-size: px-to-rem(18px);
    line-height: px-to-rem(28px);
    letter-spacing: initial;
  }

  :global(button) {
    align-self: flex-end;
  }
</style>
