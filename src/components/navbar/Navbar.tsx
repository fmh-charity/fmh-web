import React from "react";
import MainIcon from "src/assets/icons/navbar/home.svg";
import RequestIcon from "src/assets/icons/navbar/heart.svg";
import NewsIcon from "src/assets/icons/navbar/chat.svg";
import AndroidIcon from "src/assets/icons/navbar/android.svg";
import HospitalIcon from "src/assets/icons/navbar/hospital.svg";
import DocumentIcon from "src/assets/icons/navbar/docs.svg";
import SettingsIcon from "src/assets/icons/navbar/settings.svg";
import EmployeeIcon from "src/assets/icons/navbar/employee.svg";
import NavbarLink from "./components/NavbarLink";
import styles from "./Navbar.module.less";

const Navbar = () => (
  <nav className={styles.navbar_links}>
    <div className={styles.link_group}>
      <NavbarLink url="/" title="Главная" icon={<MainIcon />} />
      <NavbarLink url="/wishes" title="Просьбы" icon={<RequestIcon />} />
      <NavbarLink disabled url="/" title="Сотрудники" icon={<EmployeeIcon />} />
      <NavbarLink disabled url="/" title="Документы" icon={<DocumentIcon />} />
      <NavbarLink url="/news" title="Новости" icon={<NewsIcon />} />
      <NavbarLink disabled url="/" title="Палаты" icon={<HospitalIcon />} />
    </div>
    <div className={styles.link_group}>
      <NavbarLink disabled url="/" title="Настройки" icon={<SettingsIcon />} />
      <NavbarLink
        url="/our-missions"
        title="О приложении"
        icon={<AndroidIcon />}
      />
    </div>
  </nav>
);

export default Navbar;
