<script lang="ts">
  import work from "$lib/content/pages/work.json";
</script>

<article class="work">
  <hrgroup>
    <h1>{work.title}</h1>
  </hrgroup>
  <section>
    <ul>
      {#each work.projects as project}
        <li>
          <article>
            <a href={project.url} target="_blank">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </a>
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
    align-items: center;
  }

  hrgroup {
    max-width: var(--size--column--lg);
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 240px;
    row-gap: 80px;
  }

  li {
    flex-basis: 50%;
  }

  a {
    text-decoration: none;
  }
</style>
