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

  // Lock page scrolling while the menu is open. The class goes on <html>, so
  // nothing in the page itself changes position or repaints: the menu is an
  // overlay that fades in over an untouched page.
  $effect(() => {
    document.documentElement.classList.toggle(
      "mobile-menu-open",
      mobileMenuOpen
    );
    return () => document.documentElement.classList.remove("mobile-menu-open");
  });

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    // The burger is only reachable while the header is at least partly on
    // screen, so this is at most a small nudge that brings the whole header,
    // and with it the close button, fully into view.
    if (mobileMenuOpen && window.scrollY > 0) {
      window.scrollTo({ top: 0 });
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && mobileMenuOpen) {
      closeMobileMenu();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

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
        onclick: closeMobileMenu
      })}
    {/each}
  </ul>
{/snippet}

<div class="container">
  <header>
    <nav>
      <div class="top-menu">
        <ul>
          <Logo
            selected={page.url.pathname === "/"}
            onclick={closeMobileMenu}
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
      <div
        class={classnames("mobile-menu", { open: mobileMenuOpen })}
        id={mobileMenuId}
      >
        <div class="mobile-menu--contents">
          {@render menuItems(navItems)}
          <Connect heading="Let's connect" />
        </div>
      </div>
    </nav>
  </header>
  <div class="content" inert={mobileMenuOpen}>
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

  :global(html.mobile-menu-open) {
    overflow: hidden;
  }

  // The header sits above the page (and above the menu overlay, which lives
  // inside it) so the logo and the burger stay usable while the menu is open.
  header {
    position: relative;
    z-index: 10;
  }

  nav {
    height: 100%;

    :global(a) {
      font-family: var(--font--display);
    }
  }

  .top-menu {
    position: relative;
    z-index: 2;
    padding-inline: var(--size--edge--padding);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color--bg--accent);
    border-bottom: px-to-rem(4px) solid var(--color--brand);
    font-size: var(--text--sm);
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

  // A full-viewport overlay that starts under the header. It covers the page
  // completely, so only this one small layer needs to fade: the page behind
  // it is never animated or moved, which is what made the header flash.
  .mobile-menu {
    position: fixed;
    inset: 0;
    z-index: 1;
    padding-top: var(--header-height);
    display: flex;
    flex-flow: column;
    align-items: center;
    background: var(--color--bg--accent);
    overflow-y: auto;
    overscroll-behavior: contain;
    visibility: hidden;
    opacity: 0;
    transition:
      opacity var(--transition--duration--slow) ease-in-out,
      visibility 0s linear var(--transition--duration--slow);

    &.open {
      visibility: visible;
      opacity: 1;
      transition-delay: 0s;
    }

    // Links at the top, the connect block pinned to the bottom.
    &--contents {
      display: flex;
      flex-flow: column;
      align-items: center;
      gap: var(--space--6);
      width: 100%;
      max-width: var(--size--content--max);
      min-height: 100%;
      padding-block: var(--space--5)
        calc(var(--space--5) + env(safe-area-inset-bottom, 0px));
      padding-inline: var(--size--edge--padding);

      :global(.connect) {
        margin-top: auto;
      }
    }

    .nav-items {
      flex-flow: column;
      gap: var(--space--3);
    }

    li {
      font-size: var(--text--2xl);
      line-height: var(--leading--heading);
    }

    a {
      display: inline-block;
      padding-block: var(--space--1);
      font-weight: 500;
    }
  }

  li {
    color: var(--color--accent);
    padding-inline-start: 0;

    &.selected {
      color: var(--color--brand);
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .selected a {
    @include nav-item-selected-decoration;
  }

  .desktop-menu {
    display: none;
  }

  @include breakpoint(lg) {
    .top-menu {
      border-bottom: px-to-rem(8px) solid var(--color--brand);
    }

    :global(.hamburger),
    .mobile-menu {
      display: none;
    }

    .desktop-menu {
      display: block;
    }

    .nav-items {
      display: flex;
      flex-flow: row nowrap;
      gap: px-to-rem(48px);
    }

    li {
      font-size: var(--text--sm);

      &:hover {
        color: var(--color--brand);
      }
    }
  }
</style>
