import type { AllRolesNamesType } from "../../types/roles";

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

type NavBarScreen = {
  title: string;
  to: string;
  icon: string;
};

const allTabsJson: Map<AllTabsNames, NavBarScreen> = new Map([
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

const rolesScreens = {
  ROLE_ADMINISTRATOR: [
    "Главная",
    "Новости",
    "Хоспис",
    "Наша миссия",
    "Просьбы",
    "Пациенты",
    "Палаты",
    "Посты",
    "Пользователи",
    "Документы",
    "Сотрудники",
  ],
  ROLE_MEDICAL_WORKER: [
    "Главная",
    "Новости",
    "Хоспис",
    "Наша миссия",
    "Просьбы",
    "Пациенты",
    "Палаты",
    "Посты",
    "Документы",
    "Сотрудники",
  ],
  ROLE_VOLUNTEER: [
    "Главная",
    "Новости",
    "Хоспис",
    "Наша миссия",
    "Просьбы",
    "Пациенты",
    "Документы",
    "Сотрудники",
  ],
  ROLE_VOLUNTEER_COORDINATOR: [
    "Главная",
    "Новости",
    "Хоспис",
    "Наша миссия",
    "Просьбы",
    "Пациенты",
    "Палаты",
    "Посты",
    "Посты",
    "Документы",
    "Сотрудники",
  ],
  ROLE_PATIENT: [
    "Главная",
    "Новости",
    "Хоспис",
    "Наша миссия",
    "Просьбы",
    "Документы",
    "Сотрудники",
  ],
  ROLE_GUEST: [
    "Главная",
    "Новости",
    "Хоспис",
    "Наша миссия",
    "Документы",
    "Сотрудники",
  ],
} as const;

const getRoleTabs = (
  rolesArray: AllRolesNamesType[],
  tabJson = allTabsJson
): NavBarScreen[] => {
  const tabSet = new Set<AllTabsNames>();
  const tabsArray: NavBarScreen[] = [];
  for (const role of rolesArray) {
    for (const tab of rolesScreens[role]) {
      tabSet.add(tab);
    }
  }
  for (const tabName of tabSet) {
    const tabFromMap = tabJson.get(tabName);
    if (tabFromMap) tabsArray.push(tabFromMap);
  }
  return tabsArray;
};

export default getRoleTabs;
