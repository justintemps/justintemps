import { css } from "styled-components";
import { theme } from ".";

export const headingFontFamily = `Montserrat, sans-serif`;

export const bodyFontFamily = `"Crimson Text", serif`;

export const fontSize = ["8.125rem"];

export const Typography = css`
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: ${headingFontFamily};
  }

  h1 {
    font-weight: 700;
    font-size: ${fontSize[0]};
    color: ${(props) => theme.colors.primary};
  }

  p {
    font-family: ${bodyFontFamily};
    color: ${(props) => theme.colors.text};
  }
`;
