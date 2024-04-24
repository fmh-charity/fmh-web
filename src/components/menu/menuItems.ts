import type { Roles } from "../../common/roles";
import { Icon } from "../icon";

export type MenuItem = {
  title: string;
  roles: Roles[];
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  to: string;
};

export type MenuItemGroup = MenuItem & {
  items?: MenuItem[];
};

export const menu: MenuItemGroup[] = [
  {
    title: "Главная",
    to: "/",
    Icon: Icon.Home24,
    roles: [
      "ROLE_ADMINISTRATOR",
      "ROLE_MEDICAL_WORKER",
      "ROLE_VOLUNTEER",
      "ROLE_VOLUNTEER_COORDINATOR",
      "ROLE_PATIENT",
      "ROLE_GUEST",
      "ROLE_SYSTEM",
    ],
  },
  // {
  //   title: "Новости",
  //   to: "/news",
  //   Icon: Icon.News24,
  //   roles: [
  //     "ROLE_ADMINISTRATOR",
  //     "ROLE_MEDICAL_WORKER",
  //     "ROLE_VOLUNTEER",
  //     "ROLE_VOLUNTEER_COORDINATOR",
  //     "ROLE_PATIENT",
  //     "ROLE_GUEST",
  //     "ROLE_SYSTEM",
  //   ],
  // },
  {
    title: "Пациенты",
    to: "/patients",
    Icon: Icon.Patients24,
    roles: [
      "ROLE_ADMINISTRATOR",
      "ROLE_MEDICAL_WORKER",
      "ROLE_VOLUNTEER",
      "ROLE_VOLUNTEER_COORDINATOR",
      "ROLE_PATIENT",
      "ROLE_GUEST",
      "ROLE_SYSTEM",
    ],
  },
  {
    title: "Просьбы",
    to: "/wishes",
    Icon: Icon.Heart24,
    roles: [
      "ROLE_ADMINISTRATOR",
      "ROLE_MEDICAL_WORKER",
      "ROLE_VOLUNTEER",
      "ROLE_VOLUNTEER_COORDINATOR",
      "ROLE_PATIENT",
      "ROLE_GUEST",
      "ROLE_SYSTEM",
    ],
  },
  // {
  //   title: "Документы",
  //   to: "/documents",
  //   Icon: Icon.Docs24,
  //   roles: [
  //     "ROLE_ADMINISTRATOR",
  //     "ROLE_MEDICAL_WORKER",
  //     "ROLE_VOLUNTEER",
  //     "ROLE_VOLUNTEER_COORDINATOR",
  //     "ROLE_PATIENT",
  //     "ROLE_GUEST",
  //     "ROLE_SYSTEM",
  //   ],
  // },
  // {
  //   title: "Сотрудники",
  //   to: "/employee",
  //   Icon: Icon.Workers24,
  //   roles: [
  //     "ROLE_ADMINISTRATOR",
  //     "ROLE_MEDICAL_WORKER",
  //     "ROLE_VOLUNTEER",
  //     "ROLE_VOLUNTEER_COORDINATOR",
  //     "ROLE_PATIENT",
  //     "ROLE_GUEST",
  //     "ROLE_SYSTEM",
  //   ],
  // },
  {
    title: "Хоспис",
    to: "/hospis",
    Icon: Icon.Hospital24,
    roles: [
      "ROLE_ADMINISTRATOR",
      "ROLE_MEDICAL_WORKER",
      "ROLE_VOLUNTEER",
      "ROLE_VOLUNTEER_COORDINATOR",
      "ROLE_PATIENT",
      "ROLE_GUEST",
      "ROLE_SYSTEM",
    ],
    items: [
      {
        title: "О хосписе",
        to: "/about",
        Icon: Icon.About24,
        roles: [
          "ROLE_ADMINISTRATOR",
          "ROLE_MEDICAL_WORKER",
          "ROLE_VOLUNTEER",
          "ROLE_VOLUNTEER_COORDINATOR",
          "ROLE_PATIENT",
          "ROLE_GUEST",
          "ROLE_SYSTEM",
        ],
      },
      {
        title: "Наша миссия",
        to: "/mission",
        Icon: Icon.Hand24,
        roles: [
          "ROLE_ADMINISTRATOR",
          "ROLE_MEDICAL_WORKER",
          "ROLE_VOLUNTEER",
          "ROLE_VOLUNTEER_COORDINATOR",
          "ROLE_PATIENT",
          "ROLE_GUEST",
          "ROLE_SYSTEM",
        ],
      },
    ],
  },
];

export const footerMenu: MenuItemGroup[] = [
  {
    title: "Настройки",
    to: "/settings",
    Icon: Icon.Settings24,
    roles: [
      "ROLE_ADMINISTRATOR",
      "ROLE_MEDICAL_WORKER",
      "ROLE_VOLUNTEER",
      "ROLE_VOLUNTEER_COORDINATOR",
      "ROLE_PATIENT",
      "ROLE_GUEST",
      "ROLE_SYSTEM",
    ],
    items: [
      {
        title: "Палаты",
        to: "/nursestations",
        Icon: Icon.Bed24,
        roles: [
          "ROLE_ADMINISTRATOR",
          "ROLE_MEDICAL_WORKER",
          "ROLE_VOLUNTEER",
          "ROLE_VOLUNTEER_COORDINATOR",
          "ROLE_PATIENT",
          "ROLE_GUEST",
          "ROLE_SYSTEM",
        ],
      },
      {
        title: "Пользователи",
        to: "/users",
        Icon: Icon.User24,
        roles: [
          "ROLE_ADMINISTRATOR",
          "ROLE_MEDICAL_WORKER",
          "ROLE_VOLUNTEER",
          "ROLE_VOLUNTEER_COORDINATOR",
          "ROLE_PATIENT",
          "ROLE_GUEST",
          "ROLE_SYSTEM",
        ],
      },
    ],
  },
  {
    title: "О приложении",
    to: "/version",
    Icon: Icon.App24,
    roles: [
      "ROLE_ADMINISTRATOR",
      "ROLE_MEDICAL_WORKER",
      "ROLE_VOLUNTEER",
      "ROLE_VOLUNTEER_COORDINATOR",
      "ROLE_PATIENT",
      "ROLE_GUEST",
      "ROLE_SYSTEM",
    ],
  },
];
