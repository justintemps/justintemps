import Link from "next/link";
import styled from "styled-components";
import Clock from "../../public/clock.svg";
import { headingFontFamily } from "../../styles/typography";
import { NavItem } from "../navItem";

const Anchor = styled.a`
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  span {
    font-family: ${headingFontFamily};
  }

  svg {
    margin: 0 5px 0 0;
    position: relative;
    top: 2px;
  }
`;

const Logo = () => {
  return (
    <Link passHref href="/">
      <Anchor>
        <Clock />
        <NavItem selected={true}>justintemps</NavItem>
      </Anchor>
    </Link>
  );
};

export { Logo };
