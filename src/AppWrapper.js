import React, { useState, useEffect } from "react";
import { getCookie } from './cookie-service';
import { useLocation, useNavigate } from 'react-router-dom';

import AppRouter from "./AppRouter";
import Navbar from "./shared-kernel/ui/Navbar";
import Header from "./shared-kernel/ui/Header";
import style from "./App.module.css";
import "./normalize.css";

export const AppWrapper = () => {
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      if (!getCookie('access')) {
        navigate('/login', { replace: true });
      }
    }
  }, []);

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
