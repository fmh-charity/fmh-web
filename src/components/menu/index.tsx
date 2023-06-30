import { useState } from "react";
import styles from "./index.module.less";

type MenuItem = {
  title: string;
  to?: string;
};

type MenuItemGroup = MenuItem & {
  items?: MenuItem[];
};

type Menu = MenuItem | MenuItemGroup[];

const menu: Menu = [
  {
    title: "Главная",
    to: "/",
  },
  {
    title: "Пациенты",
    to: "/patients",
  },
  {
    title: "Просьбы",
    to: "/wishes",
  },
  {
    title: "Сотрудники",
    to: "/employee",
  },
  {
    title: "Новости",
    to: "/news",
  },
  {
    title: "Хоспис",
    to: "/hospis",
    items: [
      {
        title: "О хосписе",
        to: "/about",
      },
      {
        title: "Наша миссия",
        to: "/mission",
      },
    ],
  },
];

const footer = [
  {
    title: "Настройки",
    to: "/settings",
    items: [
      {
        title: "Палаты",
        to: "/nursestations",
      },
      {
        title: "Пользователи",
        to: "/users",
      },
    ],
  },
  {
    title: "О приложении",
    to: "/version",
  },
];

const MenuItem = ({ item }: { item: MenuItem }) => {
  return <div className={styles.item}>{item.title}</div>;
};

const MenuGroup = ({ item }: { item: MenuItemGroup }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.group}>
      <div className={styles.groupHeader}>
        {item.title}
        <button type="button" onClick={() => setOpen((c) => !c)}>
          {open ? "-" : "+"}
        </button>
      </div>
      {open && (
        <div className={styles.groupItems}>
          {item.items?.map((i) => (
            <MenuItem key={i.title} item={i} />
          ))}
        </div>
      )}
    </div>
  );
};

const Menu = ({ items }: { items: MenuItemGroup[] }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.items}>
        {items.map((m) => {
          if (m.items) return <MenuGroup key={m.title} item={m} />;
          return <MenuItem key={m.title} item={m} />;
        })}
      </div>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="Вхосписе" />
      </div>
      <Menu items={menu} />
      <div className={styles.footer}>
        <Menu items={footer} />
      </div>
    </div>
  );
};
