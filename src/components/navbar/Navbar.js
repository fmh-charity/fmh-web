import { NavLink } from "react-router-dom";

import { routes } from "../../utils/routes";
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={`${style.navbar}`}>
      {routes.map(({ path, title, icon }) => (
        <NavLink
          key={path}
          to={path}
          className={(navData) =>
            navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
          }>
          <div className={style.navIcon}>{icon}</div>
          <p>{title}</p>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
