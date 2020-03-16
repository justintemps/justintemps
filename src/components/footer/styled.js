import styled from "styled-components";

export const Foot = styled.footer`
  grid-area: footer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme: { colors } }) => colors.azzurro};
  color: ${({ theme: { colors } }) => colors.panna};
`;
