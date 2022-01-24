import { createGlobalStyle } from "styled-components";
import { size } from ".";

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
`;
