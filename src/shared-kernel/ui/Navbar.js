import { NavLink } from "react-router-dom";
import { routes } from "../../routes";
import cn from "classnames";

import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

import style from "./navbar.module.css";
//fix, убрать disable  после того как компоенты будут готовы, сделано чтобы кнопки в сайдбаре были не активными
const Navbar = ({ menuHidden, toggleMenu }) => {
  return (
    <nav className={menuHidden ? `${style.hidden}` : `${style.navbar}`}>
      <button className={style.menuButton} onClick={toggleMenu}>
        {menuHidden ? <MenuIcon /> : <MenuOpenIcon />}
      </button>
      {routes.filter(route => route.title).map(({ path, title, icon, disable }) =>
        title ? (
          <NavLink
            key={path}
            to={!disable ? path : '#'}
            className={(navData) =>
              !disable ? (navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`) : cn(style.navbarItem, style.disabled)
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
