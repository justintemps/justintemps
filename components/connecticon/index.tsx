import Link from "next/link";
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
