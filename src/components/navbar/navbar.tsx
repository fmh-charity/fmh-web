import React, { FC } from "react";
import styles from "./navbar.module.less";

interface INavbarProps {
  menuHidden: boolean;
  toggleMenu: () => void;
}

const Navbar: FC<INavbarProps> = ({ menuHidden, toggleMenu }) => (
  <div className={menuHidden ? `${styles.hidden}` : `${styles.navbar}`}>
    <button className={styles.menuButton} onClick={toggleMenu} type="button">
      {menuHidden ? <h1>menuHidden</h1> : <h1>menuHidden</h1>}
    </button>
  </div>
);

export default Navbar;
