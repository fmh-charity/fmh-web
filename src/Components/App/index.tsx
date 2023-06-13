import { Outlet } from "react-router-dom";
import { useAuthBroadcastRevalidator } from "../../shared/hooks";
import NavBarLink from "../navbarLink";
import styles from "./styles.module.less";

export default function App(): React.ReactElement {
  useAuthBroadcastRevalidator();

  return (
    <main className={styles.mainClass}>
      <aside className={styles.mainNavbar}>
        <img
          className={styles.appLogo}
          src="/assets/icons/navbar/mainLogo.png"
        />
        <ul className={styles.linkGroup}>
          <NavBarLink
            to="/"
            icon={<i className="fa fa-home" aria-hidden="true"></i>}
          >
            Главная
          </NavBarLink>
          <NavBarLink
            to="/news"
            icon={<i className="fa fa-home" aria-hidden="true"></i>}
          >
            Новости
          </NavBarLink>
          <NavBarLink
            to="/"
            icon={<i className="fa fa-user" aria-hidden="true"></i>}
          >
            Пациенты
          </NavBarLink>
          <NavBarLink
            to="/"
            icon={<i className="fa fa-heart" aria-hidden="true"></i>}
          >
            Просьбы
          </NavBarLink>
          <NavBarLink
            to="/"
            icon={<i className="fa fa-hospital-o" aria-hidden="true"></i>}
          >
            Хоспис
          </NavBarLink>
        </ul>
        <ul className={styles.linkGroup}>
          <NavBarLink
            to="/about"
            icon={<i className="fa fa-android" aria-hidden="true"></i>}
          >
            О нас
          </NavBarLink>
        </ul>
      </aside>
      <Outlet />
    </main>
  );
}
