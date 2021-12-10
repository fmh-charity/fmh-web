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

import Main from "./pages/Main/Main";
import News from "./pages/News/News";
import NotFound from "./pages/404/NotFound";
import MainPage from "./pages/Main/MainPage";

import { AuthPage } from './authorization/ui/AuthPage';

export const routes = [
  { Component: MainPage, path: '/', title: "Главная", icon: <MainIcon /> },
  { Component: Main, path: '/mainEmpty' },
  { Component: NotFound, path: '/patients', title: "Пациенты", icon: <PatientsIcon /> },
  { Component: NotFound, path: '/requests', title: "Заявки", icon: <RequestIcon /> },
  { Component: NotFound, path: '/wishes', title: "Просьбы", icon: <WishIcon /> },
  { Component: NotFound, path: '/chambers', title: "Палаты", icon: <ChamberIcon /> },
  { Component: NotFound, path: '/documents', title: "Документы", icon: <DocumentIcon /> },
  { Component: News, path: '/news', title: "Новости", icon: <NewsIcon /> },
  { Component: NotFound, path: '/schedule', title: "График дежурств", icon: <ScheduleIcon /> },
  { Component: NotFound, path: '/employees', title: "Сотрудники", icon: <EmployeesIcon /> },
  { Component: NotFound, path: '/about-us', title: "Наша миссия", icon: <MissionIcon /> },
  { Component: AuthPage, path: '/login' },
];
