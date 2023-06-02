import React from "react";
import { Link } from "react-router-dom";
import styles from "../Navbar.module.less";

const NavbarLink = ({
  icon,
  title,
  url,
  disabled,
}: {
  icon: React.ReactElement;
  title: string;
  url: string;
  disabled?: boolean;
}) => (
  <li>
    <Link
      to={url}
      className={`${styles.navbar_link} ${
        disabled ? styles.disabled_link : ""
      }`}
    >
      <span className={styles.navbar_icon}>{icon}</span>
      <span>{title}</span>
    </Link>
  </li>
);

NavbarLink.defaultProps = {
  disabled: false,
};

export default NavbarLink;
