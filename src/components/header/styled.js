import styled from "styled-components";

export const Headr = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: { colors } }) => colors.mattone};
  border-bottom: ${({ theme: { colors } }) => `5px solid ${colors.arancione}`};

  .logo {
    grid-column: col-start / span 4;
  }

  h1 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${({ theme: { colors } }) => colors.panna};
  }

  nav {
    grid-column: span 8;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  ul {
    margin: 8px 0 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    list-style: none;
  }

  li {
    margin: 0 0 0 20px;
  }
`;
