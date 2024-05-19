<script lang="ts">
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
  <li class={classnames(item.className, { selected: path === item.href })}>
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
      {@render navItem({
        href: "/",
        name: "justintemps",
        label: "home",
        className: "home"
      })}
      <li class="desktop-menu">
        {@render menuItems(navItems)}
      </li>
    </ul>
    <button class="hamburger" onclick={toggleMobileMenu}>burger</button>
  </div>
  <div class={classnames("mobile-menu", { "mobile-menu-open": mobileMenuOpen })}>
    {@render menuItems(navItems)}
  </div>
</nav>

<style lang="scss">
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

  li {
    color: var(--color--accent);
  }

  li.home {
    flex: 1 1 auto;

    &:before {
      content: "@";
      color: inherit;
    }
  }

  li:not(:first-child) {
    padding-inline-start: rem(48px);
  }

  li:hover {
    color: var(--color--brand);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .selected {
    color: var(--color--brand);

    a {
      text-decoration: underline;
      text-underline-offset: rem(8px);
      text-decoration-thickness: rem(4px);
    }
  }

  .hamburger,
  .mobile-menu {
    display: none;
  }

  @media (max-width: 768px) {
    nav {
      height: 100vh;
    }

    .desktop-menu {
      display: none;
    }

    .home {
      font-size: rem(20px);

      a {
        text-decoration: none;
      }
    }

    .hamburger {
      display: block;
    }

    .mobile-menu.mobile-menu-open {
      display: block;
      height: 100%;
      padding-block: rem(84px);
      background-color: var(--color--bg--accent);
    }

    .nav-items {
      flex-direction: column;
    }

    li {
      padding-block: rem(28px);
      font-size: rem(32px);
    }

    li:not(:first-child) {
      padding-inline-start: 0;
    }
  }
</style>
