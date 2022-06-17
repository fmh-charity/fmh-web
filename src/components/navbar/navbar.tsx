import React, { FC } from "react";
import styles from "./navbar.module.less";

interface INavbarProps {
  menuHidden: boolean;
  toggleMenu: () => void;
}

const Navbar: FC<INavbarProps> = ({ menuHidden, toggleMenu }) => {
  const mainPageIcon = "../../assets/icons/MainIcon.svg";
  const RequestIcon = "../../assets/icons/RequestIcon.svg";

  return (
    <div className={menuHidden ? `${styles.hidden}` : `${styles.navbar}`}>
      <a href="/" className="px-16 pt-6 flex text-xl">
        <img src={mainPageIcon} className="w-30 h-30 inline-block" alt="MainPageIcon"/>
        <p className="px-5 inline-block">Главная</p>
      </a>
      <a href={"/claims"} className="px-16 pt-3 flex text-xl">
        <img src={RequestIcon} className="w-30 h-30 inline-block" alt="RequestIcon" />
        <p className="px-5 inline-block">Заявки</p>
      </a>
      <button className={styles.menuButton} onClick={toggleMenu} type="button">
        {menuHidden ? <h1>menuHidden</h1> : <h1>menuHidden</h1>}
      </button>
    </div>
  );
}
export default Navbar;
