import type { NextPage } from "next";
import Link from "next/link";
import { Container, Grid } from "../components/layout";
import { Nav } from "../components/nav";
import { Block } from "../components/block";

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <header>
        <Container>
          <Grid>
            <Block>
              <h1>Hi, I&apos;m Justin</h1>
              <p>
                I’m a full-stack web developer based in Geneva, Switzerland. I
                work for the International Labour Organization, a specialised
                agency of the United Nations.
                <Link passHref href="/about">
                  <a>Want to know more?</a>
                </Link>
              </p>
            </Block>
          </Grid>
        </Container>
      </header>
    </>
  );
};

export default Home;
