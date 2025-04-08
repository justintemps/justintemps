<script lang="ts">
  import Burger from "./Burger.svelte";
  import Logo from "./Logo.svelte";
  import Connect from "./connect/connect.svelte";
  import classnames from "classnames";
  import { page } from "$app/state";
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
  <li class={classnames({ selected: page.url.pathname === item.href })}>
    <a aria-label={item.label} href={item.href} onclick={item.onclick}
      >{item.name}</a
    >
  </li>
{/snippet}

{#snippet menuItems(navItems: string[])}
  <ul class="nav-items">
    {#each navItems as item}
      {@render navItem({
        href: `/${item}`,
        name: item,
        onclick: handleMobItemClick
      })}
    {/each}
  </ul>
{/snippet}

<div class={classnames("container", { ["mobile-menu-open"]: mobileMenuOpen })}>
  <header>
    <nav>
      <div class="top-menu">
        <ul>
          <Logo
            selected={page.url.pathname === "/"}
            onclick={handleMobItemClick}
          />
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
  @use "$styles/mixins" as *;
  @use "$styles/functions" as *;

  .container {
    --header-height: #{px-to-rem(84px)};

    display: grid;
    grid-template-rows: var(--header-height) auto;
    min-height: 100vh;
  }

  nav {
    height: 100%;
  }

  .top-menu {
    padding-inline: var(--size--edge--padding);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color--bg--accent);
    border-bottom: px-to-rem(4px) solid var(--color--brand);
    font-size: px-to-rem(20px);
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
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &--contents {
      --gap: clamp(#{px-to-rem(16px)}, 6vb, #{px-to-rem(80px)});
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: var(--gap);
      gap: var(--gap);
      padding-inline: var(--size--edge--padding);
      min-height: min-content;
      width: 100%;
      max-width: var(--size--content--max);

      :global(.connect) {
        margin-top: calc(var(--gap) / 2);
      }
    }
  }

  .mobile-menu-open {
    overflow: hidden;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .mobile-menu {
      opacity: 1;
      visibility: visible;
    }
  }

  .nav-items {
    flex-flow: column;
    gap: px-to-rem(56px);
  }

  li {
    color: var(--color--accent);
    padding-inline-start: 0;
    // font-size: px-to-rem(32px);
    font-size: clamp(#{px-to-rem(20px)}, 8vi, #{px-to-rem(32px)});

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
      border-bottom: px-to-rem(8px) solid var(--color--brand);
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
      gap: px-to-rem(48px);
    }

    li {
      font-size: px-to-rem(20px);

      &:hover {
        color: var(--color--brand);
      }
    }
  }
</style>
