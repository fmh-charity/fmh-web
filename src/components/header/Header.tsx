import React from "react";
import Logo from "src/assets/icons/for-header/logo.png";
import Butterfly from "src/assets/icons/for-header/ButterflyIcon.svg";
import AuthIcon from "src/assets/icons/for-header/AuthIcon.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "src/hooks/useAuth";
import { loggedOut } from "src/features/auth/authSlice";
import styles from "./header.module.less";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const logout = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("userInfo");
    dispatch(loggedOut());
  };

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} alt="Logo" />
      <div className={styles.icons}>
        <Butterfly />
        {auth.userInfo ? (
          <button
            className={styles.logout_button}
            type="button"
            onClick={logout}
          >
            <AuthIcon />
          </button>
        ) : (
          <Link to="/login">
            <AuthIcon />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
