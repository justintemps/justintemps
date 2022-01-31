import styled from "styled-components";
//import { screen } from "../../styles";

export const Page = styled.div`
  display: grid;
  grid-template-rows: 130px 1fr;
  height: 100%;
  min-height: 100vh;
`;

export const Container = styled.div`
  max-width: var(--lg-max-width);
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-auto-rows: auto;
  width: 100%;
  height: inherit;
`;

export const Block = styled.div`
  margin: 4rem 0 0;
`;

export const Aside = styled.div`
  height: 100%;
  position: relative;

  &:after {
    pointer-events: none;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% + 6px);
    width: 100%;
    content: "";
    background: ${(props) => `linear-gradient(
      to bottom right,
      transparent calc(50% - 3px),
      ${props.theme.colors.primary} calc(50% - 3px),
      ${props.theme.colors.primary} 50%,
      transparent 50%
    );`};
  }
`;
