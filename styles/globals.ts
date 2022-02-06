import { createGlobalStyle } from "styled-components";

import { size, theme, Typography } from ".";

export const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, body > div {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }

  main {
    height: 100%;
    position: relative;
  }

  ${Typography}
`;
