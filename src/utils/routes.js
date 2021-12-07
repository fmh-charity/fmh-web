import { ReactComponent as MainIcon } from "../assets/Icons/MainIcon.svg";
import { ReactComponent as PatientsIcon } from "../assets/Icons/PatientsIcon.svg";
import { ReactComponent as RequestIcon } from "../assets/Icons/RequestIcon.svg";
import { ReactComponent as WishIcon } from "../assets/Icons/WishIcon.svg";
import { ReactComponent as ChamberIcon } from "../assets/Icons/ChamberIcon.svg";
import { ReactComponent as DocumentIcon } from "../assets/Icons/DocumentIcon.svg";
import { ReactComponent as NewsIcon } from "../assets/Icons/NewsIcon.svg";
import { ReactComponent as ScheduleIcon } from "../assets/Icons/ScheduleIcon.svg";
import { ReactComponent as EmployeesIcon } from "../assets/Icons/EmployeesIcon.svg";
import { ReactComponent as MissionIcon } from "../assets/Icons/MissionIcon.svg";

import Main from "../pages/Main/Main";
import News from "../pages/News/News";
import NotFound from "../pages/404/NotFound";

import * as CONSTANTS from "./constants";

export const routes = [
  { Component: Main, path: CONSTANTS.MAIN, title: "Главная", icon: <MainIcon /> },
  { Component: NotFound, path: CONSTANTS.PATIENTS, title: "Пациенты", icon: <PatientsIcon /> },
  { Component: NotFound, path: CONSTANTS.REQUESTS, title: "Заявки", icon: <RequestIcon /> },
  { Component: NotFound, path: CONSTANTS.WISHES, title: "Просьбы", icon: <WishIcon /> },
  { Component: NotFound, path: CONSTANTS.CHAMBERS, title: "Палаты", icon: <ChamberIcon /> },
  { Component: NotFound, path: CONSTANTS.DOCUMENTS, title: "Документы", icon: <DocumentIcon /> },
  { Component: News, path: CONSTANTS.NEWS, title: "Новости", icon: <NewsIcon /> },
  {
    Component: NotFound,
    path: CONSTANTS.SCHEDULE,
    title: "График дежурств",
    icon: <ScheduleIcon />,
  },
  { Component: NotFound, path: CONSTANTS.EMPLOYEES, title: "Сотрудники", icon: <EmployeesIcon /> },
  { Component: NotFound, path: CONSTANTS.ABOUT_US, title: "Наша миссия", icon: <MissionIcon /> },
];
