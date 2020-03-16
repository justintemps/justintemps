import styled from "styled-components";

export const Main = styled.main`
  grid-area: main;
  background-color: ${({ theme: { colors } }) => `${colors.panna}`};
  padding: 20px 0;
`;
