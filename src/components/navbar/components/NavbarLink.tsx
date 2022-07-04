import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "../navbar.module.less";

const NavbarLink = ({
  icon,
  title,
  url,
  disabled,
}: {
  icon: ReactNode;
  title: string;
  url: string;
  disabled?: boolean;
}) => (
  <Link
    to={url}
    className={
      disabled
        ? `${styles.navbar_link} ${styles.disabled_link}`
        : `${styles.navbar_link}`
    }
  >
    <span className={styles.navbar_icon}>{icon}</span>
    <span>{title}</span>
  </Link>
);

NavbarLink.defaultProps = {
  disabled: false,
};

export default NavbarLink;
