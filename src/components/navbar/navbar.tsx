import React from "react";
import { Link } from "react-router-dom";
import BurgerMenuIcon from "src/assets/icons/for-header/burger.svg";
import styles from "./navbar.module.less";
import MainIcon from "../../assets/icons/MainIcon.svg";
import RequestIcon from "../../assets/icons/RequestIcon.svg";
import NewsIcon from "../../assets/icons/NewsIcon.svg";

const Navbar = ({ toggleMenu }: { toggleMenu: () => void }) => (
  <div className={styles.navbar}>
    <div
      className={styles.button}
      role="button"
      onClick={toggleMenu}
      onKeyDown={toggleMenu}
      tabIndex={0}
    >
      <BurgerMenuIcon />
    </div>
    <Link to="/" className="">
      <span>
        <MainIcon />
      </span>
      <span className="px-8">Главная</span>
    </Link>
    <Link to="/news" className="">
      <span>
        <NewsIcon />
      </span>
      <span className="">Новости</span>
    </Link>
    <Link to="/claims" className="">
      <span>
        <RequestIcon />
      </span>
      <span className="">Заявки</span>
    </Link>
  </div>
);
export default Navbar;
