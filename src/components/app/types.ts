import type { AllRolesNamesType } from "../../types/roles";

export type AllTabsNames =
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
  | "Сотрудники"
  | "Настройки"
  | "О приложении";

export type NavBarScreen = {
  title: string;
  to: string;
  icon: string;
  mainInGroup?: string;
  groupId?: string;
};

export interface GetRoleTabsArgs {
  inputRolesArray: AllRolesNamesType[];
  tabsTitleArray?: Map<AllRolesNamesType, AllTabsNames[]>;
  tabsContentArray?: Map<AllTabsNames, NavBarScreen>;
}

export type ResultTypeGetRoleTabs = (NavBarScreen | NavBarScreen[])[];
