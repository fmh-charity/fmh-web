import { useState } from "react";
import styles from "./index.module.less";
import type { MenuItemGroup, MenuItem as MenuItemT } from "./menuItems"; // mad lint
import { footerMenu, menu } from "./menuItems";
import { Icon } from "../icon";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

const MenuItem = ({ item }: { item: MenuItemT }) => (
  <div>
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        clsx({ [styles.item]: true, [styles.isActive]: isActive })
      }
    >
      <item.Icon className={styles.icon} />
      <span>{item.title}</span>
    </NavLink>
  </div>
);

const MenuGroup = ({ item }: { item: MenuItemGroup }) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className={styles.group}>
      <div>
        <NavLink
          to={item.to}
          onClick={(e) => {
            e.preventDefault();
            setCollapse((c) => !c);
          }}
          className={({ isActive }) =>
            clsx({
              [styles.isActive]: isActive,
              [styles.groupHeader]: true,
            })
          }
        >
          <item.Icon className={styles.icon} />
          <span>{item.title}</span>
          <div className={styles.groupCollapse}>
            {collapse ? <Icon.Up16 /> : <Icon.Down16 />}
          </div>
        </NavLink>
      </div>
      {collapse && (
        <div className={styles.groupItems}>
          {item.items?.map((i) => (
            <MenuItem key={i.title} item={i} />
          ))}
        </div>
      )}
    </div>
  );
};

const Menu = ({ items }: { items: MenuItemGroup[] }) => (
  <div className={styles.menu}>
    <div className={styles.items}>
      {items.map((m) => {
        if (m.items) return <MenuGroup key={m.title} item={m} />;
        return <MenuItem key={m.title} item={m} />;
      })}
    </div>
  </div>
);

export const Sidebar = () => (
  <div className={styles.sidebar}>
    <div className={styles.logo}>
      <Link to="/">
        <img src="/images/logo.png" alt="Вхосписе" />
      </Link>
    </div>
    <Menu items={menu} />
    <div className={styles.footer}>
      <Menu items={footerMenu} />
    </div>
  </div>
);
