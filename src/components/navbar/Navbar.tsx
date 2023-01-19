import React from "react";
import MainIcon from "src/assets/icons/main_menu/MainIcon.svg";
import RequestIcon from "src/assets/icons/main_menu/RequestIcon.svg";
import NewsIcon from "src/assets/icons/main_menu/NewsIcon.svg";
import CheckIcon from "src/assets/icons/main_menu/СheckIcon.svg";
import ChamberIcon from "src/assets/icons/main_menu/ChamberIcon.svg";
import DocumentIcon from "src/assets/icons/main_menu/DocumentIcon.svg";
import СalendarIcon from "src/assets/icons/main_menu/СalendarIcon.svg";
import PatientsIcon from "src/assets/icons/main_menu/PatientsIcon.svg";
import EmployeesIcon from "src/assets/icons/main_menu/EmployeesIcon.svg";
import MissionIcon from "src/assets/icons/main_menu/MissionIcon.svg";
import InfoIcon from "src/assets/icons/main_menu/InfoIcon.svg";
import NavbarLink from "./components/NavbarLink";
import styles from "./Navbar.module.less";

const Navbar = () => {
  const menuItems = [
    {
      url: "/",
      title: "Главная",
      icon: <MainIcon />,
    },
    {
      url: "/our-missions",
      title: "Наша миссия",
      icon: <MissionIcon />,
    },

    {
      url: "/news",
      title: "Новости",
      icon: <NewsIcon />,
    },
    {
      url: "/claims",
      title: "Заявки",
      icon: <RequestIcon />,
    },
    {
      url: "/wishes",
      title: "Просьбы",
      icon: <CheckIcon />,
    },
    {
      url: "/claims",
      title: "Пациенты",
      icon: <PatientsIcon />,
      disabled: true,
    },
    {
      url: "/claims",
      title: "Палаты",
      icon: <MainIcon />,
      disabled: true,
    },
    {
      url: "/claims",
      title: "Пользователи",
      icon: <EmployeesIcon />,
      disabled: true,
    },
    {
      url: "/claims",
      title: "Документы",
      icon: <DocumentIcon />,
      disabled: true,
    },
    {
      url: "/claims",
      title: "О хосписе",
      icon: <InfoIcon />,
      disabled: true,
    },
    {
      url: "/claims",
      title: "О приложении",
      icon: <InfoIcon />,
      disabled: true,
    },
    {
      url: "/privacy-policy",
      title: "Политика конфиденциальности",
      icon: <InfoIcon />,
    },
    {
      url: "/terms-of-use",
      title: "Пользовательское соглашение",
      icon: <InfoIcon />,
    },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_links}>
        {menuItems.map((menuItem) => (
          <NavbarLink
            url={menuItem.url}
            title={menuItem.title}
            icon={menuItem.icon}
            disabled={menuItem.disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
