<script lang="ts">
  import Burger from "./Burger.svelte";
  import Logo from "./Logo.svelte";
  import Connect from "./connect/connect.svelte";
  import classnames from "classnames";
  import { page } from "$app/stores";
  import { isDesktop } from "$lib/stores/isDesktop";

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

<div class={classnames("container", { ["mobile-menu-open"]: mobileMenuOpen })}>
  <header>
    <nav>
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
        <div class="mobile-menu--contents">
          {@render menuItems(navItems)}
          <Connect heading="Let's connect" />
        </div>
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
    --header-height: #{rem(84px)};

    display: grid;
    grid-template-rows: var(--header-height) auto;
    min-height: 100vh;
  }

  nav {
    height: 100%;
  }

  .top-menu {
    @include edge-padding;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color--bg--accent);
    border-bottom: rem(4px) solid var(--color--brand);
    font-size: rem(20px);
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
    position: fixed;
    height: calc(100% - var(--header-height));
    width: 100%;
    visibility: hidden;
    opacity: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    background: var(--color--bg--accent);
    transition: all ease-in-out var(--transition--duration--slow);

    &--contents {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: space-between;
      padding-top: rem(84px);
      gap: rem(118px);
    }
  }

  .mobile-menu-open {
    overflow: hidden;
    height: 100vh;

    .mobile-menu {
      opacity: 1;
      visibility: visible;
    }
  }

  .nav-items {
    flex-flow: column;
    gap: rem(56px);
  }

  li {
    color: var(--color--accent);
    padding-inline-start: 0;
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
