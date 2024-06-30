<article>
  <h1>Justin time to blow your mind</h1>
  <div class="intro">
    <img src="/profile.png" alt="Me wearing a blue baseball cap sipping an espresso" />

    <p>My name’s Justin Smith.</p>
    <p>
      I’m a Digital Communication Officer at the International Labour Organization, a
      specialised agency of the United Nations.
    </p>
  </div>
</article>

<style lang="scss">
  article {
    width: 100%;
    display: flex;
    flex-flow: column;
    gap: rem(240px);
  }

  h1 {
    font-size: rem(136px);
    line-height: rem(148px);
    font-weight: bold;
    filter: drop-shadow(14px 13px 11px rgba(0, 0, 0, 0.5));
    max-width: calc(var(--size--content--max) - 200px);
  }

  p {
    font-size: rem(40px);
    line-height: rem(52px);
    text-align: center;
  }

  .intro {
    display: flex;
    flex-flow: column;
    position: relative;
    justify-content: center;
    align-items: center;
    border: rem(4px) solid var(--color--brand);
    border-top: none;
    padding: rem(166px) 13% rem(76px);

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 0;
      height: 4px;
      background-color: var(--color--brand);
    }

    &:before {
      left: 0;
      width: 34%;
    }

    &:after {
      right: 0;
      width: 34%;
    }
  }

  img {
    position: absolute;
    top: -34%;
  }
</style>
