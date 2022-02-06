import styled from "styled-components";

export const Page = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-row-gap: 3rem;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

export const Container = styled.div`
  max-width: ${(props) => props.theme.size.xl};
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;
