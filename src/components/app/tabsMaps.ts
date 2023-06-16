import type { AllRolesNamesType } from "../../types/roles";
import type { AllTabsNames, NavBarScreen } from "./types";

export const mainTabsContent: Map<AllTabsNames, NavBarScreen> = new Map([
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

export const mainTabsTitle: Map<AllRolesNamesType, AllTabsNames[]> = new Map([
  [
    "ROLE_ADMINISTRATOR",
    [
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
  ],
  [
    "ROLE_MEDICAL_WORKER",
    [
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
  ],
  [
    "ROLE_VOLUNTEER",
    [
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
  ],
  [
    "ROLE_VOLUNTEER_COORDINATOR",
    [
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
  ],
  [
    "ROLE_PATIENT",
    [
      "Главная",
      "Новости",
      "Хоспис",
      "О хосписе",
      "Наша миссия",
      "Просьбы",
      "Документы",
      "Сотрудники",
    ],
  ],
  [
    "ROLE_GUEST",
    [
      "Главная",
      "Новости",
      "Хоспис",
      "О хосписе",
      "Наша миссия",
      "Документы",
      "Сотрудники",
    ],
  ],
]);

export const optionTabsContent: Map<AllTabsNames, NavBarScreen> = new Map([
  [
    "Настройки",
    {
      title: "Настройки",
      to: "/",
      icon: "fa fa-cog",
      mainInGroup: "settings",
    },
  ],
  [
    "Пользователи",
    {
      title: "Пользователи",
      to: "/",
      icon: "fa fa-user-circle",
      groupId: "settings",
    },
  ],
  [
    "Палаты",
    {
      title: "Палаты",
      to: "/",
      icon: "fa fa-bed",
      groupId: "settings",
    },
  ],
  [
    "О приложении",
    {
      title: "О приложении",
      to: "/about",
      icon: "fa fa-android",
    },
  ],
]);

export const optionsTabsTitle: Map<AllRolesNamesType, AllTabsNames[]> = new Map(
  [
    [
      "ROLE_ADMINISTRATOR",
      ["Палаты", "Пользователи", "Настройки", "О приложении"],
    ],
    ["ROLE_MEDICAL_WORKER", ["Палаты", "Настройки", "О приложении"]],
    ["ROLE_VOLUNTEER", ["Настройки"]],
    ["ROLE_VOLUNTEER_COORDINATOR", ["Палаты", "Настройки", "О приложении"]],
    ["ROLE_PATIENT", ["Настройки", "О приложении"]],
    ["ROLE_GUEST", ["Настройки", "О приложении"]],
  ]
);
