import styled from "styled-components";

export const Button = styled.a`
  /* all: unset; */
  width: 56px;
  height: 56px;
  cursor: pointer;
  display: inline-block;

  svg {
    width: inherit;
    height: inherit;

    circle,
    path {
      transition: fill 250ms ease, stroke 250ms ease;
    }
  }

  &:hover,
  &:focus {
    svg {
      [class*="foreground"] {
        fill: ${(props) => props.theme.colors.background};
        stroke: ${(props) => props.theme.colors.background};
      }
      [class*="background"] {
        fill: ${(props) => props.theme.colors.accent};
      }
    }
  }
`;
