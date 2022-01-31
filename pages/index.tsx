import type { NextPage } from "next";
import Link from "next/link";
import { Connecticon } from "../components/connecticon";
import { Page, Container, Grid, Block, Aside } from "../components/layout";
import { Nav } from "../components/nav";

const Home: NextPage = () => {
  return (
    <Page>
      <Nav />
      <main>
        <Container>
          <Grid>
            <Block>
              <h1>Hi, I&apos;m Justin</h1>
              <p className="large">
                I’m a full-stack web developer based in Geneva, Switzerland. I
                work for the International Labour Organization, a specialised
                agency of the United Nations.
                <Link passHref href="/about">
                  <a>Want to know more?</a>
                </Link>
              </p>
            </Block>
            <Aside>
              <Connecticon
                icon="twitter"
                href="https://www.twitter.com/justintemps"
              />
              <Connecticon
                icon="github"
                href="https://github.com/justintemps"
              />
              <Connecticon
                icon="linkedin"
                href="https://www.linkedin.com/in/justintemps/"
              />
              <Connecticon icon="email" href="/about" siteLink />
            </Aside>
          </Grid>
        </Container>
      </main>
    </Page>
  );
};

export default Home;
