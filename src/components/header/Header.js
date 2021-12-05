import React from "react";

import AuthIcon from "../../assets/Icons/AuthIcon.svg";
import Butterfly from "../../assets/Icons/ButterflyIcon.svg";
import style from "./header.module.css";

const Header = () => {
  return (
      <header className={`${style.header}`}>
        <h1 className={`${style.heading}`}>Первый московский хоспис</h1>
        <div className={`${style.icons}`}>
          <img className={`${style.icon}`} src={Butterfly} alt="Бабочка" />
          <img className={`${style.icon}`} src={AuthIcon} alt="Авторизация" />
        </div>
      </header>
  );
};

export default Header;
