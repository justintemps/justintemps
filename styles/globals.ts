import { createGlobalStyle } from "styled-components";

import { size, theme, Typography } from ".";

export const GlobalStyle = createGlobalStyle`
  :root {
    --lg-max-width: ${size.xl};
    --base-padding: 1rem;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    color: ${theme.colors.text};
    margin: 0;
    padding: 0;
  }

  ${Typography}
`;
