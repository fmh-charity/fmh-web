import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "../navbar.module.less";

const NavbarLink = ({
  icon,
  title,
  url,
}: {
  icon: ReactNode;
  title: string;
  url: string;
}) => (
  <Link to={url} className={styles.navbar_link}>
    <span>{icon}</span>
    <span>{title}</span>
  </Link>
);

export default NavbarLink;
