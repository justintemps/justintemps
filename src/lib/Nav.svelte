<script lang="ts">
  import Burger from "./Burger.svelte";
  import Logo from "./Logo.svelte";
  import classnames from "classnames";
  import { page } from "$app/stores";
  import { isDesktop } from "../stores/isDesktop";

  interface Props {
    children: any;
  }

  type NavItem = {
    href: string;
    name: string;
    label?: string;
    className?: string;
    onclick?: () => void;
  };

  const navItems = ["about", "work", "notes", "contact"];

  const { children }: Props = $props();
  let path = $derived($page.url.pathname);

  const mobileMenuId = "mobile-menu";
  let mobileMenuOpen = $state(false);

  // Close the mobile menu if we switch back to desktop
  $effect(() => {
    if ($isDesktop) {
      mobileMenuOpen = false;
    }
  });

  function handleMobItemClick() {
    mobileMenuOpen = false;
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

{#snippet navItem(item: NavItem)}
  <li class={classnames({ selected: path === item.href })}>
    <a aria-label={item.label} href={item.href} onclick={item.onclick}>{item.name}</a>
  </li>
{/snippet}

{#snippet menuItems(navItems: string[])}
  <ul class="nav-items">
    {#each navItems as item}
      {@render navItem({ href: `/${item}`, name: item, onclick: handleMobItemClick })}
    {/each}
  </ul>
{/snippet}

<div class="container">
  <header>
    <nav class={classnames({ ["mobile-menu-open"]: mobileMenuOpen })}>
      <div class="top-menu">
        <ul>
          <Logo selected={path === "/"} onclick={handleMobItemClick} />
          <li class="desktop-menu">
            {@render menuItems(navItems)}
          </li>
        </ul>
        <Burger
          className="hamburger"
          onclick={toggleMobileMenu}
          open={mobileMenuOpen}
          controlsId={mobileMenuId}
        />
      </div>
      <div class="mobile-menu" id={mobileMenuId}>
        {@render menuItems(navItems)}
      </div>
    </nav>
  </header>
  <div class={classnames("content", { hidden: mobileMenuOpen })}>
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-rows: rem(84px) auto;
    min-height: 100vh;
  }

  nav {
    height: 100%;
  }

  .top-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color--bg--accent);
    border-bottom: rem(4px) solid var(--color--brand);
    font-size: rem(20px);
    padding-inline: rem(20px);
    height: 100%;
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
    position: absolute;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    background: var(--color--bg--accent);
    transition: all ease-in-out var(--transition--duration--slow);
  }

  .mobile-menu-open {
    .mobile-menu {
      opacity: 1;
      visibility: visible;
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

  .content {
    transition: all ease-in-out var(--transition--duration--slow);
    opacity: 1;
    visibility: visible;
    &.hidden {
      opacity: 0;
      visibility: hidden;
    }
  }

  @include breakpoint(lg) {
    .top-menu {
      border-bottom: rem(8px) solid var(--color--brand);
    }

    :global(.hamburger),
    .mobile-menu,
    .mobile-menu.open {
      display: none;
    }

    .desktop-menu {
      display: block;
    }

    .mobile-menu {
      display: none !important;
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
