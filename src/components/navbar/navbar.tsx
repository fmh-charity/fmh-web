import React from "react";
import BurgerMenuIcon from "src/assets/icons/for-header/burger.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "src/features/navbar/navbarSlice";
import { RootState } from "src/app/store";
import styles from "./navbar.module.less";
import MainIcon from "../../assets/icons/MainIcon.svg";
import RequestIcon from "../../assets/icons/RequestIcon.svg";
import NewsIcon from "../../assets/icons/NewsIcon.svg";
import NavbarLink from "./components/NavbarLink";

const Navbar = () => {
  const menuActive = useSelector((state: RootState) => state.navbar.menuActive);
  const dispatch = useDispatch();

  return menuActive ? null : (
    <div className={styles.navbar}>
      <div className={styles.header}>
        <div
          className={styles.header_button}
          role="button"
          onClick={() => dispatch(toggle())}
          onKeyDown={() => dispatch(toggle())}
          tabIndex={0}
        >
          <BurgerMenuIcon />
        </div>
      </div>
      <div className={styles.navbar_links}>
        <NavbarLink url="/" title="Главная" icon={<MainIcon />} />
        <NavbarLink url="/news" title="Новости" icon={<NewsIcon />} />
        <NavbarLink url="/claims" title="Заявки" icon={<RequestIcon />} />
      </div>
    </div>
  );
};
export default Navbar;
