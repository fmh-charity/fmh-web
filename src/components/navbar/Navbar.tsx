import React from "react";
import MainIcon from "src/assets/icons/MainIcon.svg";
import RequestIcon from "src/assets/icons/RequestIcon.svg";
import NewsIcon from "src/assets/icons/NewsIcon.svg";
import InfoIcon from "src/assets/icons/info.svg";
import ChamberIcon from "src/assets/icons/ChamberIcon.svg";
import DocumentIcon from "src/assets/icons/DocumentIcon.svg";
import EmployeesIcon from "src/assets/icons/EmployeesIcon.svg";
import PatientsIcon from "src/assets/icons/PatientsIcon.svg";
import NavbarLink from "./components/NavbarLink";
import styles from "./Navbar.module.less";

const Navbar = () => (
  <div className={styles.navbar}>
    <div className={styles.navbar_links}>
      <NavbarLink url="/" title="Главная" icon={<MainIcon />} />
      <NavbarLink url="/news" title="Новости" icon={<NewsIcon />} />
      <NavbarLink url="/claims" title="Заявки" icon={<RequestIcon />} />
      <NavbarLink url="/wishes" title="Просьбы" icon={<RequestIcon />} />
      <NavbarLink
        disabled
        url="/claims"
        title="Палаты"
        icon={<ChamberIcon />}
      />
      <NavbarLink
        disabled
        url="/claims"
        title="Документы"
        icon={<DocumentIcon />}
      />
      <NavbarLink
        disabled
        url="/claims"
        title="Пациенты"
        icon={<PatientsIcon />}
      />
      <NavbarLink
        disabled
        url="/claims"
        title="График дежурств"
        icon={<RequestIcon />}
      />
      <NavbarLink
        disabled
        url="/claims"
        title="Сотрудники"
        icon={<EmployeesIcon />}
      />
      <NavbarLink url="/our-missions" title="Наша миссия" icon={<InfoIcon />} />
      <NavbarLink
        disabled
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
export default Navbar;
