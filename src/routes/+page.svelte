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
  <h2>This is my website</h2>
  <ul>
    <li>✍️<a href="/writing">You can read my writing</a></li>
    <li>🛠️<a href="/work">Check out my projects</a></li>
    <li><a href="/contact">Get in touch</a></li>
    <li><a href="/about">Or read this shameless plug</a></li>
  </ul>
  <p>And that's it</p>
  <p>That's all there is to do here</p>
</article>

<style lang="scss">
  article {
    width: 100%;
    display: flex;
    flex-flow: column;
    gap: rem(84px);
  }

  h1,
  h2 {
    filter: drop-shadow(14px 13px 11px rgba(0, 0, 0, 0.5));
    font-weight: bold;
  }

  h1 {
    font-size: rem(136px);
    line-height: rem(148px);
    max-width: calc(var(--size--content--max) - 200px);
  }

  h2 {
    font-size: rem(80px);
    text-align: center;
  }

  p,
  li {
    font-size: rem(40px);
    line-height: rem(52px);
    text-align: center;
    padding: rem(20px) 0;
  }

  .intro {
    margin-top: rem(116px);
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

  li {
    list-style: none;
  }
</style>
