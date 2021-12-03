import { NavLink } from "react-router-dom";

import * as ROUTES from "../../utils/constants";
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={`${style.navbar}`}>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.MAIN}>
        <svg
          className={style.navIcon}
          width="20"
          height="17"
          viewBox="0 0 20 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z" fill="black" fill-opacity="0.54" />
        </svg>
        Главная
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.PATIENTS}>
        <svg
          className={style.navIcon}
          width="22"
          height="14"
          viewBox="0 0 22 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.5 8C14.3 8 12.43 8.34 11 9C9.57 8.33 7.7 8 6.5 8C4.33 8 0 9.08 0 11.25V14H22V11.25C22 9.08 17.67 8 15.5 8ZM11.5 12.5H1.5V11.25C1.5 10.71 4.06 9.5 6.5 9.5C8.94 9.5 11.5 10.71 11.5 11.25V12.5ZM20.5 12.5H13V11.25C13 10.79 12.8 10.39 12.48 10.03C13.36 9.73 14.44 9.5 15.5 9.5C17.94 9.5 20.5 10.71 20.5 11.25V12.5ZM6.5 7C8.43 7 10 5.43 10 3.5C10 1.57 8.43 0 6.5 0C4.57 0 3 1.57 3 3.5C3 5.43 4.57 7 6.5 7ZM6.5 1.5C7.6 1.5 8.5 2.4 8.5 3.5C8.5 4.6 7.6 5.5 6.5 5.5C5.4 5.5 4.5 4.6 4.5 3.5C4.5 2.4 5.4 1.5 6.5 1.5ZM15.5 7C17.43 7 19 5.43 19 3.5C19 1.57 17.43 0 15.5 0C13.57 0 12 1.57 12 3.5C12 5.43 13.57 7 15.5 7ZM15.5 1.5C16.6 1.5 17.5 2.4 17.5 3.5C17.5 4.6 16.6 5.5 15.5 5.5C14.4 5.5 13.5 4.6 13.5 3.5C13.5 2.4 14.4 1.5 15.5 1.5Z"
            fill="black"
            fill-opacity="0.54"
          />
        </svg>
        Пациетны
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.REQUESTS}>
        <svg
          className={style.navIcon}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 2H11.82C11.4 0.84 10.3 0 9 0C7.7 0 6.6 0.84 6.18 2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM9 2C9.55 2 10 2.45 10 3C10 3.55 9.55 4 9 4C8.45 4 8 3.55 8 3C8 2.45 8.45 2 9 2ZM10 16H5C4.45 16 4 15.55 4 15C4 14.45 4.45 14 5 14H10C10.55 14 11 14.45 11 15C11 15.55 10.55 16 10 16ZM13 12H5C4.45 12 4 11.55 4 11C4 10.45 4.45 10 5 10H13C13.55 10 14 10.45 14 11C14 11.55 13.55 12 13 12ZM13 8H5C4.45 8 4 7.55 4 7C4 6.45 4.45 6 5 6H13C13.55 6 14 6.45 14 7C14 7.55 13.55 8 13 8Z"
            fill="black"
            fill-opacity="0.54"
          />
        </svg>
        Заявки
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.WISHES}>
        <svg
          className={style.navIcon}
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.00016 11.17L1.83016 6.99997L0.410156 8.40997L6.00016 14L18.0002 1.99997L16.5902 0.589966L6.00016 11.17Z"
            fill="black"
            fill-opacity="0.54"
          />
        </svg>
        Просьбы
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.CHAMBERS}>
        <svg
          className={style.navIcon}
          width="22"
          height="15"
          viewBox="0 0 22 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 9C7.66 9 9 7.66 9 6C9 4.34 7.66 3 6 3C4.34 3 3 4.34 3 6C3 7.66 4.34 9 6 9ZM6 5C6.55 5 7 5.45 7 6C7 6.55 6.55 7 6 7C5.45 7 5 6.55 5 6C5 5.45 5.45 5 6 5ZM18 2H10V10H2V0H0V15H2V12H20V15H22V6C22 3.79 20.21 2 18 2ZM20 10H12V4H18C19.1 4 20 4.9 20 6V10Z"
            fill="black"
            fill-opacity="0.54"
          />
        </svg>
        Палаты
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.DOCUMENTS}>
        <svg
          className={style.navIcon}
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6L10 0ZM2 18V2H9V7H14V18H2Z"
            fill="black"
            fill-opacity="0.54"
          />
        </svg>
        Документы
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.NEWS}>
        <svg
          className={style.navIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 0H2C0.9 0 0 0.9 0 2V20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H3.17L2 15.17V2H18V14ZM9 10H11V12H9V10ZM9 4H11V8H9V4Z"
            fill="black"
            fill-opacity="0.54"
          />
        </svg>
        Новости
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.SCHEDULE}>
        <svg
          className={style.navIcon}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 11H10C9.45 11 9 11.45 9 12V15C9 15.55 9.45 16 10 16H13C13.55 16 14 15.55 14 15V12C14 11.45 13.55 11 13 11ZM13 1V2H5V1C5 0.45 4.55 0 4 0C3.45 0 3 0.45 3 1V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2H15V1C15 0.45 14.55 0 14 0C13.45 0 13 0.45 13 1ZM15 18H3C2.45 18 2 17.55 2 17V7H16V17C16 17.55 15.55 18 15 18Z"
            fill="black"
            fill-opacity="0.54"
          />
        </svg>
        График дежурств
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.EMPLOYEES}>
        <svg
          className={style.navIcon}
          width="22"
          height="14"
          viewBox="0 0 22 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 1V13C20 13.55 20.45 14 21 14C21.55 14 22 13.55 22 13V1C22 0.45 21.55 0 21 0C20.45 0 20 0.45 20 1ZM17 14C17.55 14 18 13.55 18 13V1C18 0.45 17.55 0 17 0C16.45 0 16 0.45 16 1V13C16 13.55 16.45 14 17 14ZM13 0H1C0.45 0 0 0.45 0 1V13C0 13.55 0.45 14 1 14H13C13.55 14 14 13.55 14 13V1C14 0.45 13.55 0 13 0ZM7 2.75C8.24 2.75 9.25 3.76 9.25 5C9.25 6.24 8.24 7.25 7 7.25C5.76 7.25 4.75 6.24 4.75 5C4.75 3.76 5.76 2.75 7 2.75ZM11.5 12H2.5V11.25C2.5 9.75 5.5 9 7 9C8.5 9 11.5 9.75 11.5 11.25V12Z"
            fill="black"
            fill-opacity="0.54"
          />
        </svg>
        Сотрудники
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? `${style.navbarItem} ${style.active}` : `${style.navbarItem}`
        }
        to={ROUTES.ABOUT_US}>
        <svg
          className={style.navIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
            fill="black"
            fill-opacity="0.54"
          />
        </svg>
        Наша миссия
      </NavLink>
    </nav>
  );
};

export default Navbar;
