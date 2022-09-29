import styled from "styled-components";

interface NavItemProps {
  selected: boolean;
}

const Item = styled.span<{ selected: boolean }>`
  position: relative;
  font-family: inherit;
  font-size: inherit;
  color: inherit;

  &:after {
    content: "";
    position: absolute;
    bottom: -0.3em;
    left: 0;
    width: 100%;
    height: 0.2em;
    background-color: ${(props) => props.theme.colors.primary};
    transition: opacity 300ms, transform 300ms;
    opacity: ${(props) => (props.selected ? "1" : "0")};
    transform: ${(props) => (props.selected ? "scaleX(1)" : "scaleX(0)")};
    transform-origin: center;
  }
  &:hover {
    &:after {
      opacity: 1;
      transform: translate3d(0, 0.2em, 0);
      transform: scaleX(1);
    }
  }
`;

const NavItem: React.FC<NavItemProps> = ({ children, selected }) => {
  return <Item selected={selected}>{children}</Item>;
};

export { NavItem };
