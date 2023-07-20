import { Link, Outlet, useRouteLoaderData, useRoutes } from "react-router-dom";
import { Icon } from "../icon";
import styles from "./index.module.less";
import type { UserInfoDto } from "../../api/model";
import { getRoleByRank } from "../../common/roles";
import clsx from "clsx";

export const Header = () => {
  const data = useRouteLoaderData("app") as {
    body?: UserInfoDto;
    error?: any;
  };

  const router = useRoutes([
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
        <div className={clsx(styles.column, styles.sectionName)}>{router}</div>
        <div className={styles.column}>
          <Icon.Notificatons24 />
        </div>
        <Link to="/profile" className={clsx(styles.column, styles.profile)}>
          <div className={styles.column}>
            <img src="/images/avatar_mock.png" alt="avatar" />
          </div>
          <div>
            <div className={styles.name}>
              {data.body?.firstName} {data.body?.lastName}
            </div>
            <div className={styles.roles}>
              {data.body?.roles ? (
                <div>{getRoleByRank(data.body?.roles)?.roleName}</div>
              ) : null}
            </div>
          </div>
        </Link>
        <Link to="/logout" className={clsx(styles.column, styles.action)}>
          <Icon.ActionDefault24 />
        </Link>
      </div>
    </div>
  );
};
