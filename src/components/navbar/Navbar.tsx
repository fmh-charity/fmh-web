import React from "react";
import AndroidIcon from "src/assets/icons/navbar/android.svg";
import DocumentIcon from "src/assets/icons/navbar/docs.svg";
import EmployeeIcon from "src/assets/icons/navbar/employee.svg";
import RequestIcon from "src/assets/icons/navbar/heart.svg";
import MainIcon from "src/assets/icons/navbar/home.svg";
import HospitalIcon from "src/assets/icons/navbar/hospital.svg";
import PatientIcon from "src/assets/icons/navbar/patient.svg";
import SettingsIcon from "src/assets/icons/navbar/settings.svg";
import NavbarLink from "./components/NavbarLink";
import styles from "./Navbar.module.less";

const Navbar = () => (
  <nav className={styles.navbar_links}>
    <ul className={styles.link_group}>
      <NavbarLink url="/" title="Главная" icon={<MainIcon />} />
      <NavbarLink disabled url="/" title="Пациенты" icon={<PatientIcon />} />
      <NavbarLink url="/wishes" title="Просьбы" icon={<RequestIcon />} />
      <NavbarLink disabled url="/" title="Сотрудники" icon={<EmployeeIcon />} />
      <NavbarLink disabled url="/" title="Документы" icon={<DocumentIcon />} />
      <NavbarLink disabled url="/" title="Палаты" icon={<HospitalIcon />} />
      <NavbarLink
        disabled
        url="/"
        title="Управление пользователями"
        icon={<HospitalIcon />}
      />
    </ul>
    <ul className={styles.link_group}>
      <NavbarLink disabled url="/" title="Настройки" icon={<SettingsIcon />} />
      <NavbarLink
        url="/terms-of-use"
        title="О приложении"
        icon={<AndroidIcon />}
      />
      <NavbarLink
        url="/our-missions"
        title="Наша миссия"
        icon={<AndroidIcon />}
      />
    </ul>
  </nav>
);

export default Navbar;
