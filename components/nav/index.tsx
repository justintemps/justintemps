import styled from "styled-components";
import Link from "next/link";
import { Container } from "../layout";
import { Logo } from "../logo";
import { fontSize, headingFontFamily } from "../../styles/typography";

const Navbar = styled.nav`
  width: 100%;
  border-bottom: 3px solid ${(props) => props.theme.colors.primary};
  font-size: ${fontSize.heading[4]};
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
              <a>about</a>
            </Link>
          </li>
          <li>
            <Link passHref href="/work">
              <a>work</a>
            </Link>
          </li>
          <li>
            <Link passHref href="/notes">
              <a>notes</a>
            </Link>
          </li>
          <li>
            <Link passHref href="/connect">
              <a>connect</a>
            </Link>
          </li>
        </SiteLinks>
      </NavItems>
    </Navbar>
  );
};

export { Nav };
