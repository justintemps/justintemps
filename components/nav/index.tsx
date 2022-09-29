import Link from "next/link";
import styled from "styled-components";
import { fontSize, headingFontFamily } from "../../styles/typography";
import { Container } from "../layout";
import { Logo } from "../logo";
import { NavItem } from "../navItem";

const Navbar = styled.nav`
  width: 100%;
  border-bottom: 3px solid ${(props) => props.theme.colors.primary};
  font-size: ${fontSize.heading[4]};
  background-color: ${(props) => props.theme.colors.background_accent};
`;

const NavItems = styled(Container)`
  height: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const SiteLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  flex-basis: 33%;

  li {
    margin: 0;
    font-family: ${headingFontFamily};

    &:last-child {
      padding-right: 0;
    }
  }
`;

const Nav: React.FC = ({ children }) => {
  return (
    <Navbar>
      <NavItems>
        <Logo />
        <SiteLinks>
          <li>
            <Link passHref href="/about">
              <a>
                <NavItem>about</NavItem>
              </a>
            </Link>
          </li>
          <li>
            <Link passHref href="/work">
              <a>
                <NavItem>work</NavItem>
              </a>
            </Link>
          </li>
          <li>
            <Link passHref href="/notes">
              <a>
                <NavItem>notes</NavItem>
              </a>
            </Link>
          </li>
          <li>
            <Link passHref href="/connect">
              <a>
                <NavItem>connect</NavItem>
              </a>
            </Link>
          </li>
        </SiteLinks>
      </NavItems>
    </Navbar>
  );
};

export { Nav };
