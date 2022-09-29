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
    transition: fill 150ms ease-out, stroke 150ms ease-out,
      filter 150ms ease-out;
  }

  &:hover,
  &:focus {
    svg {
      filter: ${(props) =>
        `drop-shadow(0px 0px 16px ${props.theme.colors.primary})`};

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
