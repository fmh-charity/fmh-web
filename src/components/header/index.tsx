import { Link, Outlet, useRoutes } from "react-router-dom";
import { Icon } from "../icon";
import styles from "./index.module.less";

export const Header = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <Outlet />,
      children: [
        { element: <div>Главная</div>, index: true },
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
        {
          path: "settings/*",
          element: <div>Настройки</div>,
        },
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
  ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.column}>{router}</div>
        <div className={styles.column}>
          <Icon.Notificatons24 />
        </div>
        <div className={styles.column}>
          <img src="/images/avatar_mock.png" alt="avatar" />
        </div>
        <div className={styles.column}>
          <div>name</div>
          <div>roles</div>
        </div>
        <div className={styles.column}>
          <Link to="/logout" className={styles.column}>
            <Icon.User24 />
          </Link>
        </div>
      </div>
    </div>
  );
};
