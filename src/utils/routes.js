import Main from "../pages/Main/Main";
import News from "../pages/News/News";
import NotFound from "../pages/404/NotFound";

import {
  MAIN,
  PATIENTS,
  REQUESTS,
  WISHES,
  CHAMBERS,
  DOCUMENTS,
  NEWS,
  SCHEDULE,
  EMPLOYEES,
  ABOUT_US,
} from "./constants";

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
  { component: <Main />, path: MAIN, title: "Главная", icon: <MainIcon /> },
  { component: <NotFound />, path: PATIENTS, title: "Пациенты", icon: <PatientsIcon /> },
  { component: <NotFound />, path: REQUESTS, title: "Заявки", icon: <RequestIcon /> },
  { component: <NotFound />, path: WISHES, title: "Просьбы", icon: <WishIcon /> },
  { component: <NotFound />, path: CHAMBERS, title: "Палаты", icon: <ChamberIcon /> },
  { component: <NotFound />, path: DOCUMENTS, title: "Документы", icon: <DocumentIcon /> },
  { component: <News />, path: NEWS, title: "Новости", icon: <NewsIcon /> },
  { component: <NotFound />, path: SCHEDULE, title: "График дежурств", icon: <ScheduleIcon /> },
  { component: <NotFound />, path: EMPLOYEES, title: "Сотрудники", icon: <EmployeesIcon /> },
  { component: <NotFound />, path: ABOUT_US, title: "Наша миссия", icon: <MissionIcon /> },
];
