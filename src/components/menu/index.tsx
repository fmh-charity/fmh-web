import { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import type { MenuItemGroup, MenuItem as MenuItemT } from "./menuItems"; // mad lint
import { footerMenu, menu } from "./menuItems";
import { Icon } from "../icon";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

const MenuItem = ({ item, close }: { item: MenuItemT; close?: () => void }) => (
  <div>
    <NavLink
      to={item.to}
      onClick={() => {
        // TODO: Рефакторинг
        console.log("MENU KLICK");
        close?.();
      }}
      className={({ isActive }) =>
        clsx({ [styles.item]: true, [styles.isActive]: isActive })
      }
    >
      <item.Icon className={styles.icon} />
      <span>{item.title}</span>
    </NavLink>
  </div>
);

const MenuGroup = ({
  item,
  close,
}: {
  item: MenuItemGroup;
  close?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    if (ref?.current && collapse) {
      ref.current.scrollIntoView({ block: "nearest" });
    }
  }, [collapse]);
  return (
    <div className={styles.group} ref={ref}>
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
            <MenuItem key={i.title} item={i} close={close} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Menu = ({
  items,
  close,
}: {
  items: MenuItemGroup[];
  close?: () => void;
}) => (
  <div className={styles.menu}>
    <div className={styles.items}>
      {items.map((m) => {
        if (m.items) return <MenuGroup key={m.title} item={m} close={close} />;
        return <MenuItem key={m.title} item={m} close={close} />;
      })}
    </div>
  </div>
);

export const Sidebar = () => (
  <div className={styles.sidebar}>
    <div className={styles.logo}>
      <Link to="/main">
        <img src="/images/logoMenu.svg" alt="Вхосписе" />
      </Link>
    </div>
    <Menu items={menu} />
    <div className={styles.footer}>
      <Menu items={footerMenu} />
    </div>
  </div>
);
