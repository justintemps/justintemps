import styled from "styled-components";
import Link from "next/link";
import { Container } from "../layout";

const Navbar = styled.nav`
  width: 100%;
  border-bottom: 3px solid ${(props) => props.theme.colors.primary};
  margin: 0 0 4rem;
`;

const NavItems = styled(Container)`
  height: 130px;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.a`
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.primary};
`;

function Nav() {
  return (
    <Navbar>
      <NavItems>
        <Link passHref href="/">
          <Logo>@justintemps</Logo>
        </Link>
      </NavItems>
    </Navbar>
  );
}

export { Nav };
