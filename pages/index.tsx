import type { NextPage } from "next";
import { Homepage } from "../components/layouts";

const Home: NextPage = () => {
  return (
    <Homepage>
      <nav>
        <p>@justintemps</p>
      </nav>
      <section>
        <h1>Hi, I'm Justin</h1>
      </section>
    </Homepage>
  );
};

export default Home;
