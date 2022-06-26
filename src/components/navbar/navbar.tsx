import React from "react";
import BurgerMenuIcon from "src/assets/icons/for-header/burger.svg";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { toggle } from "src/features/navbar/navbarSlice";
import { RootState } from "src/app/store";
import MainIcon from "src/assets/icons/MainIcon.svg";
import RequestIcon from "src/assets/icons/RequestIcon.svg";
import NewsIcon from "src/assets/icons/NewsIcon.svg";
import InfoIcon from "src/assets/icons/info.svg";
import ChamberIcon from "src/assets/icons/ChamberIcon.svg";
import DocumentIcon from "src/assets/icons/DocumentIcon.svg";
import EmployeesIcon from "src/assets/icons/EmployeesIcon.svg";
import PatientsIcon from "src/assets/icons/PatientsIcon.svg";
import styles from "./navbar.module.less";
import NavbarLink from "./components/NavbarLink";

const Navbar = () => {
  const menuActive = useAppSelector(
    (state: RootState) => state.navbar.menuActive
  );
  const dispatch = useAppDispatch();

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
        <NavbarLink url="/claims" title="Просьбы" icon={<RequestIcon />} />
        <NavbarLink url="/claims" title="Палаты" icon={<ChamberIcon />} />
        <NavbarLink url="/claims" title="Документы" icon={<DocumentIcon />} />
        <NavbarLink url="/claims" title="Пациенты" icon={<PatientsIcon />} />
        <NavbarLink
          url="/claims"
          title="График дежурств"
          icon={<RequestIcon />}
        />
        <NavbarLink url="/claims" title="Сотрудники" icon={<EmployeesIcon />} />
        <NavbarLink url="/claims" title="Наша миссия" icon={<InfoIcon />} />
        <NavbarLink
          url="/claims"
          title="Новости роль чтения"
          icon={<NewsIcon />}
        />
        <NavbarLink
          url="/terms-of-use"
          title="Пользовательское соглашение"
          icon={<InfoIcon />}
        />
        <NavbarLink
          url="/privacy-policy"
          title="Политика конфиденциальности"
          icon={<InfoIcon />}
        />
      </div>
    </div>
  );
};
export default Navbar;
