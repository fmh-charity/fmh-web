import { Outlet } from "react-router-dom";
import { useAuthBroadcastRevalidator } from "../../shared/hooks";
import NavBarLink from "../navbar-link";
import styles from "./styles.module.less";
import roleTabs from "./roleTabs";

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
          {roleTabs.ROLE_ADMINISTRATOR?.map(item =>
            <NavBarLink
              to={item.to}
              icon={<i className={item.icon} aria-hidden="true"></i>}
              children={item.title}
            />)}
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
