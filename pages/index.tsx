import type { NextPage } from "next";
import Link from "next/link";
import { Container, Page } from "../components/layout";
import { Nav } from "../components/nav";
import { SocialButton } from "../components/socialbutton";
import { Aside, Divider, Grid, Tilted } from "../templates/homepage";

const Home: NextPage = () => {
  return (
    <Page>
      <Nav />
      <main>
        <Container>
          <Grid>
            <div>
              <h1>Hi, I&apos;m Justin</h1>
              <p>
                I’m a full-stack web developer based in Geneva, Switzerland. I
                work for the International Labour Organization, a specialised
                agency of the United Nations.
                <Link passHref href="/about">
                  <a>Want the whole story?</a>
                </Link>
              </p>
            </div>
            <Aside>
              <Divider />
              <Tilted>
                <SocialButton
                  icon="twitter"
                  href="https://www.twitter.com/justintemps"
                />
                <SocialButton
                  icon="github"
                  href="https://github.com/justintemps"
                />

                <SocialButton
                  icon="linkedin"
                  href="https://www.linkedin.com/in/justintemps/"
                />
                <SocialButton icon="email" href="/about" siteLink />
              </Tilted>
            </Aside>
          </Grid>
        </Container>
      </main>
    </Page>
  );
};

export default Home;
