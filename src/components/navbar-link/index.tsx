import type { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.less";
import React from "react";

type Props = LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    icon?: React.ReactNode;
    isActive?: boolean;
  };

export default function NavBarLink({
  children,
  icon,
  isActive,
  ...linkProps
}: Props): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  return (
    <li>
      <Link {...linkProps} className={styles.navbarLink}>
        <div>{icon}</div>
        <div className={isActive ? styles.active : ""}>{children}</div>
        <i
          className={`fa fa-chevron-${isCollapsed ? "up" : "down"} ${
            styles.chevron
          }`}
          aria-hidden="true"
        ></i>
      </Link>
    </li>
  );
}
