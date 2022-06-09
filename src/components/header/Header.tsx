import React from "react";
import Logo from "../../assets/icons/for-header/logo.png";
// import Butterfly from "../../assets/icons/for-header/Butterfly.svg";
// import AuthIcons from "../../assets/icons/for-header/AuthIcons.svg";
import styles from "../header.module.css";

const Header = (menuHidden: boolean) => (
  <header className={menuHidden ? `${styles.header}` : `${styles.menuActive}`}>
    <div className={styles.hiding}>
      <img className={styles.logo} src={Logo} alt="logo" />
    </div>
    <div className={styles.icons} />
  </header>
);

export default Header;
