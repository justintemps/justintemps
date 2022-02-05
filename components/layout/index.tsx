import styled from "styled-components";
//import { screen } from "../../styles";

export const Page = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-row-gap: 3rem;
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
  grid-template-columns: 66% 1fr;
  grid-auto-rows: auto;
  width: 100%;
  height: inherit;
`;

export const Block = styled.div``;

export const Aside = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 14.2rem;

  &:after {
    pointer-events: none;
    z-index: -1;
    position: absolute;
    top: -3rem;
    left: 0;
    height: calc(100% + 3rem);
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

export const ConnectBtns = styled.div`
  width: 46%;
  height: 295px;
  left: 4rem;
  position: relative;
  top: 5px;
`;
