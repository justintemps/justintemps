import styled from "styled-components";
import Twitter from "./icons/twitter.svg";
import LinkedIn from "./icons/linkedin.svg";
import Email from "./icons/email.svg";
import Github from "./icons/github.svg";
import Link from "next/link";

const Button = styled.a`
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

interface IconProps {
  icon: "twitter" | "linkedin" | "email" | "github";
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  if (icon === "twitter") {
    return <Twitter />;
  }
  if (icon === "linkedin") {
    return <LinkedIn />;
  }
  if (icon === "email") {
    return <Email />;
  }
  if (icon === "github") {
    return <Github />;
  }
  return null;
};

interface ConnectBtnProps extends IconProps {
  href: string;
  siteLink?: boolean;
}

const Connecticon: React.FC<ConnectBtnProps> = ({
  icon,
  href,
  siteLink = false,
}) => {
  if (siteLink) {
    return (
      <Link href={href} passHref>
        <Button>
          <Icon icon={icon} />
        </Button>
      </Link>
    );
  }

  return (
    <Button href={href} target="_blank">
      <Icon icon={icon} />
    </Button>
  );
};

export { Connecticon };
