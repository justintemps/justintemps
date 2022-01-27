import styled from "styled-components";
//import { screen } from "../../styles";

export const Container = styled.div`
  max-width: var(--lg-max-width);
  width: 100%;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-auto-rows: auto;
  width: 100%;
`;
