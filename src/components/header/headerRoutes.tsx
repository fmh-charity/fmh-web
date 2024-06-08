import { Outlet } from "react-router-dom";

export const headerRoutes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      { element: <div>Главная</div>, index: true },
      {
        path: "profile/*",
        element: <div>Профиль</div>,
      },
      {
        path: "hospis",
        element: <div>Хоспис</div>,
      },
      {
        path: "version",
        element: <div>О приложении</div>,
      },
      {
        path: "users/*",
        element: <div>Пользователи</div>,
      },
      {
        path: "nursestations/*",
        element: <div>Палаты</div>,
      },
      // {
      //   path: "settings/*",
      //   element: <div>Настройки</div>,
      // },
      {
        path: "about/*",
        element: <div>О хосписе</div>,
      },
      {
        path: "mission/*",
        element: <div>Наша миссия</div>,
      },
      {
        path: "employee/*",
        element: <div>Сотрудники</div>,
      },
      {
        path: "documents/*",
        element: <div>Документы</div>,
      },
      {
        path: "patients/*",
        element: <div>Пациенты</div>,
      },
      {
        path: "news/*",
        element: <div>Новости</div>,
      },
      {
        path: "wishes/*",
        element: <div>Просьбы</div>,
      },
    ],
  },
];
