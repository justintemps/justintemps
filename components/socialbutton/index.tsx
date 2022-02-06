import Link from "next/link";
import React, { forwardRef, ForwardRefRenderFunction } from "react";
import Email from "./icons/email.svg";
import Github from "./icons/github.svg";
import LinkedIn from "./icons/linkedin.svg";
import Twitter from "./icons/twitter.svg";
import { Button } from "./styled";
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

const SocialBtn: ForwardRefRenderFunction<
  HTMLAnchorElement,
  ConnectBtnProps
> = ({ icon, href, siteLink = false }, ref) => {
  if (siteLink) {
    return (
      <Link href={href} passHref>
        <Button ref={ref}>
          <Icon icon={icon} />
        </Button>
      </Link>
    );
  }
  return (
    <Button href={href} target="_blank" ref={ref}>
      <Icon icon={icon} />
    </Button>
  );
};

export const SocialButton = forwardRef(SocialBtn);
