import styled from "styled-components";

export const PageLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 85px auto 50px;
  width: 100%;
  min-height: 100vh;
  grid-template-areas:
    "header header header header"
    "main main main main"
    "footer footer footer footer";
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-gap: 0 20px;
  max-width: 1300px;
  width: 100%;
  padding: 0 20px;
`;
