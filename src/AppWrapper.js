import React, { useState } from "react";

import AppRouter from "./AppRouter";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import style from "./App.module.css";
import "./normalize.css";

export const AppWrapper = () => {
  const [hidden, setHidden] = useState(false);

  const toggleMenu = () => {
    setHidden(!hidden);
  };
  return (
    <div
      className={
        hidden
          ? `${style.wrapper} ${style["base-colors"]}`
          : `${style.menuActive} ${style["base-colors"]}`
      }>
      <Header menuHidden={hidden} />
      <Navbar menuHidden={hidden} toggleMenu={toggleMenu} />
      <AppRouter />
    </div>
  );
};
