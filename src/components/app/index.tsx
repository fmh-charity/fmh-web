import type { QueryClient } from "@tanstack/react-query";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { ensureUserInfo } from "../../shared/auth";
import { useAuthBroadcastRevalidator } from "../../shared/hooks";
import type { NavBarLinkProps } from "../navbar-link";
import NavBarLink from "../navbar-link";
import { Notifications } from "../notifications";
import getRoleTabs from "./getRoleTabs";
import styles from "./styles.module.less";
import { optionTabsContent, optionsTabsTitle } from "./tabsMaps";
import type { NavBarScreen, ResultTypeGetRoleTabs } from "./types";

export const loader = (queryClient: QueryClient) => async () => {
  return await ensureUserInfo(queryClient);
};

export const App = () => {
  const data = useLoaderData();
  console.log({ data });

  useAuthBroadcastRevalidator();
  const location = useLocation();

  const commonLinkProps = (
    element: NavBarScreen,
    locationPath = location.pathname
  ): NavBarLinkProps => {
    return {
      isActive: element.to === locationPath,
      to: element.to,
      title: element.title,
      icon: <i className={element.icon} aria-hidden="true"></i>,
    };
  };

  const mapRenderFuntion = (
    tab: ResultTypeGetRoleTabs[number]
  ): React.ReactNode => {
    if (Array.isArray(tab)) {
      const parentElement = tab.slice(0, 1)[0];
      const childrenElement = tab.slice(1);
      return (
        <NavBarLink {...commonLinkProps(parentElement)}>
          {childrenElement.map((child) => (
            <NavBarLink
              key={child.to + child.title}
              {...commonLinkProps(child)}
            />
          ))}
        </NavBarLink>
      );
    }
    return <NavBarLink {...commonLinkProps(tab)} />;
  };

  return (
    <main className={styles.mainClass}>
      <aside className={styles.mainNavbar}>
        <img
          alt="main logo"
          className={styles.appLogo}
          src="/assets/icons/navbar/mainLogo.png"
        />
        <ul className={styles.linkGroup}>
          {getRoleTabs({ inputRolesArray: data.roles })?.map(mapRenderFuntion)}
        </ul>
        <ul className={styles.linkGroup}>
          {getRoleTabs({
            inputRolesArray: data.roles,
            tabsContentArray: optionTabsContent,
            tabsTitleArray: optionsTabsTitle,
          })?.map(mapRenderFuntion)}
        </ul>
      </aside>
      <Outlet />
      <Notifications />
    </main>
  );
};
