import React from "react";
import BurgerMenuIcon from "src/assets/icons/for-header/burger.svg";
import Logo from "src/assets/icons/for-header/logo.png";
import Butterfly from "src/assets/icons/for-header/ButterflyIcon.svg";
import AuthIcon from "src/assets/icons/for-header/AuthIcon.svg";
import { toggle } from "src/features/navbar/navbarSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./header.module.less";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className={styles.menuActive}>
      <div
        className={styles.button}
        role="button"
        onClick={() => dispatch(toggle())}
        onKeyDown={() => dispatch(toggle())}
        tabIndex={0}
      >
        <BurgerMenuIcon />
      </div>
      <img className={styles.logo} src={Logo} alt="Logo" />
      <div className={styles.icons}>
        <Butterfly />
        <Link to="/login">
          <AuthIcon />
        </Link>
      </div>
    </header>
  );
};

export default Header;
