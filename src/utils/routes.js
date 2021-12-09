import Main from "../pages/Main/Main";
import News from "../pages/News/News";
import NewsWindow from "../pages/News/NewsWindow";
import NewsWindowRoleRead from "../pages/News/NewsWindowRoleRead";
import NotFound from "../pages/404/NotFound";

import * as CONSTANTS from "./constants";

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

export const routes = [
  { component: <Main />, path: CONSTANTS.MAIN, title: "Главная", icon: <MainIcon /> },
  { component: <NotFound />, path: CONSTANTS.PATIENTS, title: "Пациенты", icon: <PatientsIcon /> },
  { component: <NotFound />, path: CONSTANTS.REQUESTS, title: "Заявки", icon: <RequestIcon /> },
  { component: <NotFound />, path: CONSTANTS.WISHES, title: "Просьбы", icon: <WishIcon /> },
  { component: <NotFound />, path: CONSTANTS.CHAMBERS, title: "Палаты", icon: <ChamberIcon /> },
  {
    component: <NotFound />,
    path: CONSTANTS.DOCUMENTS,
    title: "Документы",
    icon: <DocumentIcon />,
  },
  {
    component: <News />,
    path: CONSTANTS.NEWS_EMPTY,
    title: "Новости Заглушка",
    icon: <NewsIcon />,
  },
  { component: <NewsWindow />, path: CONSTANTS.NEWS, title: "Новости", icon: <NewsIcon /> },

  {
    component: <NewsWindowRoleRead />,
    path: CONSTANTS.NEWS_ROLE_READ,
    title: "Новости Роль Чтение",
    icon: <NewsIcon />,
  },

  {
    component: <NotFound />,
    path: CONSTANTS.SCHEDULE,
    title: "График дежурств",
    icon: <ScheduleIcon />,
  },
  {
    component: <NotFound />,
    path: CONSTANTS.EMPLOYEES,
    title: "Сотрудники",
    icon: <EmployeesIcon />,
  },
  {
    component: <NotFound />,
    path: CONSTANTS.ABOUT_US,
    title: "Наша миссия",
    icon: <MissionIcon />,
  },
];
