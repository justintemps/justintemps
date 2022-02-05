import { css } from "styled-components";
import { theme } from ".";

export const headingFontFamily = `Montserrat, sans-serif`;

export const bodyFontFamily = `"Crimson Text", serif`;

export const fontSize = ["7.4375rem", "5rem", "3.25rem", "3rem", "1.5rem"];

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
    white-space: nowrap;
    color: ${theme.colors.primary};
    margin: 0 0 1rem -0.06em;
  }

  p {
    font-family: ${bodyFontFamily};
    color: ${theme.colors.text};
    font-size: ${fontSize[4]};
    line-height: normal;
  }

  /* Let's fix this with the Text component I like that idea */
  p.large {
    font-weight: 400;
    letter-spacing: normal;
    font-size: ${fontSize[2]};
    margin: 0;
  }

  a {
    color: ${theme.colors.secondary};
    text-decoration: none;
    transition: color 250ms ease;
    &:hover {
      color: ${theme.colors.primary};
    }
  }

  nav {
    font-size: ${fontSize[4]};
    font-family: ${headingFontFamily};
  }
`;
