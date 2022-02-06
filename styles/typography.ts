import { css } from "styled-components";
import { theme } from ".";

export const headingFontFamily = `Montserrat, sans-serif`;

export const bodyFontFamily = `"Crimson Text", serif`;

export const fontSize = {
  heading: ["7.6rem", "5rem", "3.75rem", "2.5rem", "1.5rem"],
  body: ["7rem", "3.3333rem", "3rem", "2.5rem", "2rem"],
};

export const Typography = css`
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: ${headingFontFamily};
  }

  p,
  span,
  div {
    font-family: ${bodyFontFamily};
  }

  h1 {
    font-weight: 700;
    font-size: ${fontSize.heading[0]};
    white-space: nowrap;
    color: ${theme.colors.primary};
    margin: 0 0 1rem -0.06em;
  }

  p {
    color: ${theme.colors.text};
    font-size: ${fontSize.body[1]};
    line-height: normal;
    letter-spacing: 0px;
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
`;
