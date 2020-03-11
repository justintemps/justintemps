import styled from "styled-components"

export const Headr = styled.header`
  background-color: ${({ theme: { colors } }) => colors.mattone};
  border-bottom: ${({ theme: { colors } }) => `5px solid ${colors.arancione}`};
  margin: 0 0 1.75rem;
  padding: 1rem;

  .inner-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    max-width: 1330px;
    margin: 0 auto;
  }

  h1 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${({ theme: { colors } }) => colors.panna};
  }

  nav {
    margin: 0;
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    margin: 0;
  }

  li {
    margin: 0 20px;
  }
`
