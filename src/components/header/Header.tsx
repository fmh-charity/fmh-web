import React from "react";
import BurgerMenuIcon from "src/assets/icons/for-header/burger.svg";
import Logo from "src/assets/icons/for-header/logo.png";
import Butterfly from "src/assets/icons/for-header/ButterflyIcon.svg";
import AuthIcon from "src/assets/icons/for-header/AuthIcon.svg";
import styles from "./header.module.less";

const Header = ({ toggleMenu }: { toggleMenu: () => void }) => (
  <header className={styles.menuActive}>
    <div
      className={styles.button}
      role="button"
      onClick={toggleMenu}
      onKeyDown={toggleMenu}
      tabIndex={0}
    >
      <BurgerMenuIcon />
    </div>
    <img className={styles.logo} src={Logo} alt="Logo" />
    <div className={styles.icons}>
      <Butterfly />
      <a href="/login">
        <AuthIcon />
      </a>
    </div>
  </header>
);

export default Header;
