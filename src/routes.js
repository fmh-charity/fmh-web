import { lazy } from "react";
import { ReactComponent as MainIcon } from "./assets/Icons/MainIcon.svg";
import { ReactComponent as PatientsIcon } from "./assets/Icons/PatientsIcon.svg";
import { ReactComponent as RequestIcon } from "./assets/Icons/RequestIcon.svg";
import { ReactComponent as WishIcon } from "./assets/Icons/WishIcon.svg";
import { ReactComponent as ChamberIcon } from "./assets/Icons/ChamberIcon.svg";
import { ReactComponent as DocumentIcon } from "./assets/Icons/DocumentIcon.svg";
import { ReactComponent as NewsIcon } from "./assets/Icons/NewsIcon.svg";
import { ReactComponent as ScheduleIcon } from "./assets/Icons/ScheduleIcon.svg";
import { ReactComponent as EmployeesIcon } from "./assets/Icons/EmployeesIcon.svg";
import { ReactComponent as MissionIcon } from "./assets/Icons/MissionIcon.svg";
import { AuthPage } from './authorization/ui/AuthPage';
import StatementPage from './statementPage/StatementPage';

const Main = lazy(() => import("./main/ui/Main"));
const News = lazy(() => import("./news/ui/News"));
const NewsWindow = lazy(() => import("./news/ui/NewsWindow"));
const NewsWindowRoleRead = lazy(() => import("./news/ui/NewsWindowRoleRead"));
const MainPage = lazy(() => import("./main/ui/MainPage"));
const NotFound = lazy(() => import("./not-found/ui/NotFound.js"));

export const routes = [
  { Component: MainPage, path: "/", title: "Главная", icon: <MainIcon /> },
  { Component: NotFound, path: "/patients", title: "Пациенты", icon: <PatientsIcon /> },
  { Component: StatementPage, path: "/statements", title: "Заявки", icon: <RequestIcon /> },
  { Component: NotFound, path: "/wishes", title: "Просьбы", icon: <WishIcon /> },
  { Component: NotFound, path: "/chambers", title: "Палаты", icon: <ChamberIcon /> },
  { Component: NotFound, path: "/documents", title: "Документы", icon: <DocumentIcon /> },
  { Component: NewsWindow, path: "/news", title: "Новости", icon: <NewsIcon /> },
  { Component: NotFound, path: "/schedule", title: "График дежурств", icon: <ScheduleIcon /> },
  { Component: NotFound, path: "/employees", title: "Сотрудники", icon: <EmployeesIcon /> },
  { Component: NotFound, path: "/about-us", title: "Наша миссия", icon: <MissionIcon /> },
  {
    Component: NewsWindowRoleRead,
    path: "/newsRoleRead",
    title: "Новости Роль Чтение",
    icon: <NewsIcon />,
  },
  { Component: News, path: "/newsEmpty" },
  { Component: Main, path: "/mainEmpty" },
  { Component: AuthPage, path: "/login" },
  { Component: NotFound, path: "*" },
];
