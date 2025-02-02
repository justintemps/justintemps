<script lang="ts">
  import type { ComponentType, SvelteComponent } from "svelte";
  import Mail from "$lib/components/connect/mail.svelte";
  import LinkedIn from "$lib/components/connect/linkedin.svelte";
  import Mastadon from "$lib/components/connect/mastadon.svelte";
  import Github from "$lib/components/connect/github.svelte";

  interface SocialLink {
    name: string;
    url: string;
    target?: string;
    Icon: ComponentType<SvelteComponent<any>>;
  }

  const socialLinks: SocialLink[] = [
    {
      name: "Mastadon",
      url: "https://fosstodon.org/@justintemps",
      Icon: Mastadon,
      target: "__blank"
    },
    {
      name: "Github",
      url: "https://github.com/justintemps",
      Icon: Github,
      target: "__blank"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/justintemps/",
      Icon: LinkedIn,
      target: "__blank"
    },
    {
      name: "Contact",
      url: "/contact",
      Icon: Mail
    }
  ];
</script>

{#snippet socialLink({ name, url, Icon, target }: SocialLink)}
  <li>
    <a href={url} title={name} {target}>
      <Icon />
      <span class="screen-reader-only">{name}</span>
    </a>
  </li>
{/snippet}

<ul>
  {#each socialLinks as link}
    {@render socialLink({
      name: link.name,
      url: link.url,
      Icon: link.Icon,
      target: link.target
    })}
  {/each}
</ul>

<style lang="scss">
  @use "$styles/functions" as *;
  ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    list-style: none;
    gap: px-to-rem(40px);
  }

  :global(.social-icon) {
    height: px-to-rem(40px);
    width: px-to-rem(40px);
    :global(path) {
      transition: fill ease-in-out var(--transition--duration--fast);
      fill: var(--color--accent);
    }

    &:hover {
      :global(path) {
        fill: var(--color--brand);
      }
    }
  }
</style>
