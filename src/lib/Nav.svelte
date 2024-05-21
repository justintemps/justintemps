<script lang="ts">
  import Burger from "./Burger.svelte";
  import Logo from "./Logo.svelte";
  import classnames from "classnames";
  import { page } from "$app/stores";

  type NavItem = {
    href: string;
    name: string;
    label?: string;
    className?: string;
  };

  const navItems = ["about", "work", "notes", "contact"];

  let path = $derived($page.url.pathname);

  let mobileMenuOpen = $state(false);
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
</script>

{#snippet navItem(item: NavItem)}
  <li class={classnames({ selected: path === item.href })}>
    <a aria-label={item.label} href={item.href}>{item.name}</a>
  </li>
{/snippet}

{#snippet menuItems(navItems: string[])}
  <ul class="nav-items">
    {#each navItems as item}
      {@render navItem({ href: `/${item}`, name: item })}
    {/each}
  </ul>
{/snippet}

<nav>
  <div class="top-menu">
    <ul>
      <Logo selected={path === "/"} />
      <li class="desktop-menu">
        {@render menuItems(navItems)}
      </li>
    </ul>
    <Burger className="hamburger" onclick={toggleMobileMenu} open={mobileMenuOpen} />
  </div>
  <div class={classnames("mobile-menu", { open: mobileMenuOpen })}>
    {@render menuItems(navItems)}
  </div>
</nav>

<style lang="scss">
  nav {
    height: 100vh;
  }

  .top-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color--bg--accent);
    border-bottom: rem(8px) solid var(--color--brand);
    height: rem(84px);
    font-size: rem(20px);
    padding-inline: rem(20px);
  }

  ul {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    width: 100%;
    max-width: var(--size--content--max);
  }

  :global(.hamburger) {
    display: block;
  }

  .mobile-menu {
    display: none;

    &.open {
      display: block;
      height: 100%;
      padding-block: rem(84px);
      background-color: var(--color--bg--accent);
    }
  }

  .nav-items {
    flex-flow: column;
  }

  li {
    color: var(--color--accent);
    padding-inline-start: 0;
    padding-block: rem(28px);
    font-size: rem(32px);

    &.selected {
      color: var(--color--brand);
      @include nav-item-selected-decoration;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .desktop-menu {
    display: none;
  }

  @media (min-width: 786px) {
    :global(.hamburger),
    .mobile-menu,
    .mobile-menu.open {
      display: none;
    }

    .desktop-menu {
      display: block;
    }

    .nav-items {
      display: flex;
      flex-flow: row nowrap;
      gap: rem(48px);
    }

    li {
      font-size: rem(20px);

      &:hover {
        color: var(--color--brand);
      }
    }
  }
</style>
