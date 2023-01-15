import React from "react";
import MainIcon from "src/assets/icons/main_menu/MainIcon.svg";
import MainIconGreen from "src/assets/icons/main_menu/MainIconGreen.svg";
import RequestIcon from "src/assets/icons/main_menu/RequestIcon.svg";
import RequestIconGreen from "src/assets/icons/main_menu/RequestIconGreen.svg";
import NewsIcon from "src/assets/icons/main_menu/NewsIcon.svg";
import NewsIconGreen from "src/assets/icons/main_menu/NewsIconGreen.svg";
import CheckIcon from "src/assets/icons/main_menu/СheckIcon.svg";
import CheckIconGreen from "src/assets/icons/main_menu/СheckIconGreen.svg";
import ChamberIcon from "src/assets/icons/main_menu/ChamberIcon.svg";
import ChamberIconGreen from "src/assets/icons/main_menu/ChamberIconGreen.svg";
import DocumentIcon from "src/assets/icons/main_menu/DocumentIcon.svg";
import DocumentIconGreen from "src/assets/icons/main_menu/DocumentIconGreen.svg";
import СalendarIcon from "src/assets/icons/main_menu/СalendarIcon.svg";
import СalendarIconGreen from "src/assets/icons/main_menu/СalendarIconGreen.svg";
import PatientsIcon from "src/assets/icons/main_menu/PatientsIcon.svg";
import PatientsIconGreen from "src/assets/icons/main_menu/PatientsIconGreen.svg";
import EmployeesIcon from "src/assets/icons/main_menu/EmployeesIcon.svg";
import EmployeesIconGreen from "src/assets/icons/main_menu/EmployeesIconGreen.svg";
import MissionIcon from "src/assets/icons/main_menu/MissionIcon.svg";
import MissionIconGreen from "src/assets/icons/main_menu/MissionIconGreen.svg";
import InfoIcon from "src/assets/icons/main_menu/InfoIcon.svg";
import InfoIconGreen from "src/assets/icons/main_menu/InfoIconGreen.svg";
import NavbarLink from "./components/NavbarLink";
import styles from "./Navbar.module.less";

const Navbar = () => (
  <div className={styles.navbar}>
    <div className={styles.navbar_links}>
      <NavbarLink
        url="/"
        title="Главная"
        icon={<MainIcon />}
        iconGreen={<MainIconGreen />}
      />
      <NavbarLink
        url="/news"
        title="Новости"
        icon={<NewsIcon />}
        iconGreen={<NewsIconGreen />}
      />
      <NavbarLink
        url="/claims"
        title="Заявки"
        icon={<RequestIcon />}
        iconGreen={<RequestIconGreen />}
      />
      <NavbarLink
        url="/wishes"
        title="Просьбы"
        icon={<CheckIcon />}
        iconGreen={<CheckIconGreen />}
      />
      <NavbarLink
        disabled
        url="/claims"
        title="Палаты"
        icon={<ChamberIcon />}
        iconGreen={<ChamberIconGreen />}
      />
      <NavbarLink
        disabled
        url="/claims"
        title="Документы"
        icon={<DocumentIcon />}
        iconGreen={<DocumentIconGreen />}
      />
      <NavbarLink
        disabled
        url="/claims"
        title="Пациенты"
        icon={<PatientsIcon />}
        iconGreen={<PatientsIconGreen />}
      />
      <NavbarLink
        disabled
        url="/claims"
        title="График дежурств"
        icon={<СalendarIcon />}
        iconGreen={<СalendarIconGreen />}
      />
      <NavbarLink
        disabled
        url="/claims"
        title="Сотрудники"
        icon={<EmployeesIcon />}
        iconGreen={<EmployeesIconGreen />}
      />
      <NavbarLink
        url="/our-missions"
        title="Наша миссия"
        icon={<MissionIcon />}
        iconGreen={<MissionIconGreen />}
      />{" "}
      <NavbarLink
        disabled
        url="/claims"
        title="Новости роль чтения"
        icon={<NewsIcon />}
        iconGreen={<NewsIconGreen />}
      />
      <NavbarLink
        url="/terms-of-use"
        title="Пользовательское соглашение"
        icon={<InfoIcon />}
        iconGreen={<InfoIconGreen />}
      />
      <NavbarLink
        url="/privacy-policy"
        title="Политика конфиденциальности"
        icon={<InfoIcon />}
        iconGreen={<InfoIconGreen />}
      />
    </div>
  </div>
);
export default Navbar;
