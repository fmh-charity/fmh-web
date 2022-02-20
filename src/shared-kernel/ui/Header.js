import React from "react";

import AuthIcon from "../../assets/Icons/AuthIcon.svg";
import Butterfly from "../../assets/Icons/ButterflyIcon.svg";
import Logo from "../../assets/logo.png";
import styles from "./header.module.css";

const Header = ({ menuHidden }) => {
  return (
    <header className={menuHidden ? `${styles.header}` : `${styles.menuActive}`}>
      <div className={styles.heading}>
        <img className={styles.logo} src={Logo} alt="Logo" />
      </div>
      <div className={`${styles.icons}`}>
        <img className={`${styles.icon}`} src={Butterfly} alt="Бабочка" />
        <img className={`${styles.icon}`} src={AuthIcon} alt="Авторизация" />
      </div>
    </header>
  );
};

export default Header;
