import { NavLink } from "react-router-dom";
import { routes } from "../../routes";

import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

import style from "./navbar.module.css";

const Navbar = ({ menuHidden, toggleMenu }) => {
  return (
    <nav className={menuHidden ? `${style.hidden}` : `${style.navbar}`}>
      <button className={style.menuButton} onClick={toggleMenu}>
        {menuHidden ? <MenuIcon /> : <MenuOpenIcon />}
      </button>
      {routes.filter(route => route.title).map(({ path, title, icon }) =>
        title ? (
          <NavLink
            key={path}
            to={path}
            className={(navData) =>
              navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
            }>
            <div className={style.navIcon}>{icon}</div>
            <p>{title}</p>
          </NavLink>
        ) : null,
      )}
    </nav>
  );
};

export default Navbar;
