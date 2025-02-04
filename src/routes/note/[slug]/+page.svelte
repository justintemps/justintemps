<script lang="ts">
  import LastUpdate from "$lib/components/LastUpdate.svelte";
  import Categories from "../../../lib/components/Categories.svelte";

  let { data } = $props();
  const { title, description, date, categories } = data.meta;

  let Component = data.content;
</script>

<article>
  <section>
    <hrgroup>
      <h1>{title}</h1>
      <p>{description}</p>
    </hrgroup>
    <LastUpdate {date} />
    <Categories {categories} />
  </section>
  <section>
    <Component />
  </section>
</article>

<style lang="scss">
  @use "$styles/functions" as *;
  article {
    hrgroup {
      h1 {
        font-size: px-to-rem(60px);
        line-height: normal;
        letter-spacing: -1%;
      }

      p {
        font-family: var(--font--display);
        font-size: px-to-rem(24px);
        line-height: normal;
      }
    }
  }
</style>
