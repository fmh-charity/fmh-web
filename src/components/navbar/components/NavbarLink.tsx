import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "../Navbar.module.less";

const NavbarLink = ({
  icon,
  title,
  url,
  disabled,
  mainLink,
}: {
  icon: ReactNode;
  title: string;
  url: string;
  disabled?: boolean;
  mainLink?: boolean;
}) => (
  <div className={styles.navbar_link_container}>
    {" "}
    <Link
      to={url}
      className={
        disabled
          ? `${styles.navbar_link} ${styles.disabled_link}`
          : `${styles.navbar_link}`
      }
    >
      <span className={styles.navbar_icon}>{icon}</span>
      <span className={mainLink ? `${styles.navbar_mainLink}` : ""}>
        {title}
      </span>
    </Link>
  </div>
);

NavbarLink.defaultProps = {
  disabled: false,
  mainLink: false,
};

export default NavbarLink;
