import type { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.less";
import React from "react";

export type NavBarLinkProps = LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    icon?: React.ReactNode;
    isActive?: boolean;
    title?: string;
    children?: React.ReactNode;
  };

export default function NavBarLink({
  children,
  icon,
  isActive,
  title,
  ...linkProps
}: Props): React.ReactElement {
  const isGroup = !!children;
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (isGroup) {
      e.preventDefault();
      setIsCollapsed(!isCollapsed);
    }
    linkProps.onClick?.(e);
  };

  return (
    <li>
      <Link {...linkProps} onClick={onClickLink} className={styles.navbarLink}>
        <div>{icon}</div>
        <div className={isActive ? styles.active : ""}>{title}</div>
        {isGroup && (
          <i
            className={`fa fa-chevron-${isCollapsed ? "up" : "down"} ${
              styles.chevron
            }`}
            aria-hidden="true"
          ></i>
        )}
      </Link>
      {isCollapsed && <ul className={styles.childList}>{children}</ul>}
    </li>
  );
}
