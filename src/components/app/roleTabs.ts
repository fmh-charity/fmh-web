import type { AllRolesNamesType } from "../../types/roles";

type AllTabsNames =
  | "Главная"
  | "Новости"
  | "О хосписе"
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
  mainInGroup?: string;
  groupId?: string;
};

const allTabsMap: Map<AllTabsNames, NavBarScreen> = new Map([
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
      title: "О хосписе",
      to: "/",
      icon: "fa fa-hospital-o",
      mainInGroup: "hospital",
    },
  ],
  [
    "О хосписе",
    {
      title: "О хосписе",
      to: "/",
      icon: "fa fa-hospital-o",
      groupId: "hospital",
    },
  ],
  [
    "Наша миссия",
    {
      title: "Наша миссия",
      to: "/",
      icon: "fa fa-hospital-o",
      groupId: "hospital",
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
    "О хосписе",
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
    "О хосписе",
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
    "О хосписе",
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
    "О хосписе",
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
    "О хосписе",
    "Наша миссия",
    "Просьбы",
    "Документы",
    "Сотрудники",
  ],
  ROLE_GUEST: [
    "Главная",
    "Новости",
    "Хоспис",
    "О хосписе",
    "Наша миссия",
    "Документы",
    "Сотрудники",
  ],
} as const;

type ResultTypeGetRoleTabs = (NavBarScreen | NavBarScreen[])[];

const getRoleTabs = (
  rolesArray: AllRolesNamesType[],
  tabs = allTabsMap
): ResultTypeGetRoleTabs => {
  const tabSet = new Set<AllTabsNames>();
  const allTabsList: NavBarScreen[] = [];
  let resultArray: ResultTypeGetRoleTabs = [];
  for (const role of rolesArray) {
    for (const tab of rolesScreens[role]) {
      tabSet.add(tab);
    }
  }
  for (const tabName of tabSet) {
    const tabFromMap = tabs.get(tabName);
    if (tabFromMap) {
      allTabsList.push(tabFromMap);
    }
  }
  for (const tab of allTabsList) {
    let nextNavTab;
    if (tab.mainInGroup) {
      nextNavTab = allTabsList.filter(
        (item) => item.groupId === tab.mainInGroup
      );
    } else {
      nextNavTab = tab;
    }
    resultArray.push(nextNavTab);
  }
  resultArray = resultArray.filter((item) => {
    if (Array.isArray(item)) {
      return true;
    } else {
      return !item.groupId;
    }
  });
  return resultArray;
};

export default getRoleTabs;
