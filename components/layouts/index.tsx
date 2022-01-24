import styled from "styled-components";
import { screen } from "../../styles";

export const Homepage = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  overflow-x: hidden;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns:
    minmax(var(--base-padding), auto)
    minmax(auto, var(--lg-max-width))
    minmax(var(--base-padding), auto);
  grid-template-rows: 41px auto auto auto minmax(min-content, max-content);
  grid-template-areas:
    ". nav ."
    "hero  hero hero"
    ". stories  ."
    ". banners  ."
    ". footer .";

  @media ${screen.sm} {
    grid-template-rows: 27px auto auto auto minmax(min-content, max-content);
  }

  @media ${screen.md} {
    grid-template-columns:
      minmax(var(--base-padding), auto)
      8%
      1fr
      8%
      minmax(var(--base-padding), auto);
    grid-template-areas:
      ". nav nav nav ."
      "hero hero hero  hero hero"
      ". . stories . ."
      ". banners banners banners  ."
      ". footer footer footer .";
  }

  @media ${screen.lg} {
    grid-template-columns:
      minmax(var(--base-padding), auto)
      minmax(auto, var(--lg-max-width))
      minmax(var(--base-padding), auto);
    grid-template-areas:
      ". nav ."
      "hero  hero hero"
      ". stories  ."
      ". banners  ."
      ". footer .";
  }
`;
