import React from "react";

import AuthIcon from "../../assets/Icons/AuthIcon.svg";
import Butterfly from "../../assets/Icons/ButterflyIcon.svg";
import style from "./header.module.css";

const Header = ({ menuHidden }) => {
  return (
    <header className={menuHidden ? `${style.header}` : `${style.menuActive}`}>
      <h1 className={`${style.heading}`}>В хосписе</h1>
      <div className={`${style.icons}`}>
        <img className={`${style.icon}`} src={Butterfly} alt="Бабочка" />
        <img className={`${style.icon}`} src={AuthIcon} alt="Авторизация" />
      </div>
    </header>
  );
};

export default Header;
