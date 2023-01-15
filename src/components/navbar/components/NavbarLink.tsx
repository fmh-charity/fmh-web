import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Navbar.module.less";

const NavbarLink = ({
  icon,
  iconGreen,
  title,
  url,
  disabled,
}: {
  icon: ReactNode;
  iconGreen: ReactNode;
  title: string;
  url: string;
  disabled?: boolean;
}) => (
  <NavLink
    to={url}
    className={({ isActive }) =>
      `${styles.navbar_link} + 
    ${disabled ? styles.disabled_link : ""} + 
    ${isActive ? styles.navbar_activeLink : ""} + `
    }
  >
    {({ isActive }) => {
      return (
        <div className={styles.navbar_link_container}>
          <div className={styles.navbar_icon}>
            {isActive ? iconGreen : icon}
          </div>
          <span className={isActive ? `${styles.navbar_activeLink_text}` : ""}>
            {title}
          </span>
        </div>
      );
    }}
  </NavLink>
);

NavbarLink.defaultProps = {
  disabled: false,
};

export default NavbarLink;
