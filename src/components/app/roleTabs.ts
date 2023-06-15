import type { APP_ROLES } from "../../shared/contants";

type AllTabsNames =
  | "Главная"
  | "Новости"
  | "Хоспис"
  | "Наша миссия"
  | "Просьбы"
  | "Пациенты"
  | "Палаты"
  | "Посты"
  | "Пользователи"
  | "Документы"
  | "Сотрудники";

type NavBarScreen =
  | {
      title: string;
      to: string;
      icon: string;
    }
  | undefined;
type NavBarScreenNonNull = NonNullable<NavBarScreen>;

const tabsJson: Map<AllTabsNames, NavBarScreenNonNull> = new Map([
  [
    "Главная",
    {
      title: "Главная",
      to: "/",
      icon: "fa fa-home",
    },
  ],
  [
    "Пациенты",
    {
      title: "Пациенты",
      to: "/",
      icon: "fa fa-user",
    },
  ],
  [
    "Просьбы",
    {
      title: "Просьбы",
      to: "/",
      icon: "fa fa-heart",
    },
  ],
  [
    "Хоспис",
    {
      title: "Хоспис",
      to: "/",
      icon: "fa fa-hospital-o",
    },
  ],
  [
    "Новости",
    {
      title: "Новости",
      to: "/news",
      icon: "fa fa-hospital-o",
    },
  ],
]);

type RolesType = typeof APP_ROLES[number]["key"];

const rolesTable: Record<RolesType, NavBarScreen[]> = {
  ROLE_ADMINISTRATOR: [
    tabsJson.get("Главная"),
    tabsJson.get("Новости"),
    tabsJson.get("Хоспис"),
    tabsJson.get("Наша миссия"),
    tabsJson.get("Просьбы"),
    tabsJson.get("Пациенты"),
    tabsJson.get("Палаты"),
    tabsJson.get("Посты"),
    tabsJson.get("Пользователи"),
    tabsJson.get("Документы"),
    tabsJson.get("Сотрудники"),
  ],
  ROLE_MEDICAL_WORKER: [
    tabsJson.get("Главная"),
    tabsJson.get("Новости"),
    tabsJson.get("Хоспис"),
    tabsJson.get("Наша миссия"),
    tabsJson.get("Просьбы"),
    tabsJson.get("Пациенты"),
    tabsJson.get("Палаты"),
    tabsJson.get("Посты"),
    tabsJson.get("Документы"),
    tabsJson.get("Сотрудники"),
  ],
  ROLE_VOLUNTEER: [
    tabsJson.get("Главная"),
    tabsJson.get("Новости"),
    tabsJson.get("Хоспис"),
    tabsJson.get("Наша миссия"),
    tabsJson.get("Просьбы"),
    tabsJson.get("Пациенты"),
    tabsJson.get("Документы"),
    tabsJson.get("Сотрудники"),
  ],
  ROLE_VOLUNTEER_COORDINATOR: [
    tabsJson.get("Главная"),
    tabsJson.get("Новости"),
    tabsJson.get("Хоспис"),
    tabsJson.get("Наша миссия"),
    tabsJson.get("Просьбы"),
    tabsJson.get("Пациенты"),
    tabsJson.get("Палаты"),
    tabsJson.get("Посты"),
    tabsJson.get("Посты"),
    tabsJson.get("Документы"),
    tabsJson.get("Сотрудники"),
  ],
  ROLE_PATIENT: [
    tabsJson.get("Главная"),
    tabsJson.get("Новости"),
    tabsJson.get("Хоспис"),
    tabsJson.get("Наша миссия"),
    tabsJson.get("Просьбы"),
    tabsJson.get("Документы"),
    tabsJson.get("Сотрудники"),
  ],
  ROLE_GUEST: [
    tabsJson.get("Главная"),
    tabsJson.get("Новости"),
    tabsJson.get("Хоспис"),
    tabsJson.get("Наша миссия"),
    tabsJson.get("Документы"),
    tabsJson.get("Сотрудники"),
  ],
};

const unfilteredTable = Object.entries(rolesTable);
const filtredTable = unfilteredTable.map(([key, value]) => [
  key,
  value.filter((item) => !!item),
]);
const roleTabs: Record<RolesType, NavBarScreenNonNull[]> =
  Object.fromEntries(filtredTable);

export default roleTabs;
