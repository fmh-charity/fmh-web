import { Outlet, useLoaderData } from "react-router-dom";
import { useAuthBroadcastRevalidator } from "../../shared/hooks";
import NavBarLink from "../navbar-link";
import getRoleTabs from "./roleTabs";
import { Notifications } from "../notifications";
import styles from "./styles.module.less";
import type { QueryClient } from "@tanstack/react-query";
import { ensureUserInfo } from "../../shared/auth";

export const loader = (queryClient: QueryClient) => async () => {
  return await ensureUserInfo(queryClient);
};

export const App = () => {
  const data = useLoaderData();
  console.log({ data });

  useAuthBroadcastRevalidator();

  return (
    <main className={styles.mainClass}>
      <aside className={styles.mainNavbar}>
        <img
          alt="main logo"
          className={styles.appLogo}
          src="/assets/icons/navbar/mainLogo.png"
        />
        <ul className={styles.linkGroup}>
          {getRoleTabs(data.roles)?.map((item) => (
            <NavBarLink
              key={item.to + item.title}
              to={item.to}
              icon={<i className={item.icon} aria-hidden="true"></i>}
            >
              {item.title}
            </NavBarLink>
          ))}
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
      <Notifications />
    </main>
  );
};
