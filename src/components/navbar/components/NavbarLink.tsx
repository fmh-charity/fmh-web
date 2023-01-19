import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Navbar.module.less";

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
  <NavLink
    to={url}
    className={({ isActive }) =>
      `${styles.navbar_link} + 
    ${disabled ? styles.disabled_link : ""} + 
    ${isActive ? styles.navbar_activeLink : ""}`
    }
  >
    {({ isActive }) => {
      return (
        <div
          className={`${styles.navbar_link_container} + ${
            isActive ? `${styles.navbar_activeLink}` : ""
          }`}
        >
          <div className={styles.navbar_icon}>{icon}</div>
          <span>{title}</span>
        </div>
      );
    }}
  </NavLink>
);

NavbarLink.defaultProps = {
  disabled: false,
};

export default NavbarLink;
