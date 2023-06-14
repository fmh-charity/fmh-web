// localStorage
export const LOGIN_LOCALSTORAGE_KEY = "LOGIN_LOCALSTORAGE_KEY";
export const USERINFO_LOCALSTORAGE_KEY = "USERINFO_LOCALSTORAGE_QUERY";

// Authentication
export const LOGIN_QUERY = "LOGIN_QUERY";
export const USERINFO_QUERY = "USERINFO_QUERY";
export const ROLES_QUERY = "ROLES_QUERY";
export const REGISTRATION_QUERY = "REGISTRATION_QUERY";

// News
export const NEWS_QUERY = "NEWS_QUERY";

export const APP_ROLES = [
  {
    id: 1,
    key: "ROLE_ADMINISTRATOR",
    name: "Администратор системы",
  },
  {
    id: 2,
    key: "ROLE_MEDICAL_WORKER",
    name: "Медработник",
  },
  {
    id: 3,
    key: "ROLE_VOLUNTEER",
    name: "Волонтер",
  },
  {
    id: 4,
    key: "ROLE_VOLUNTEER_COORDINATOR",
    name: "Координатор волонтеров",
  },
  {
    id: 5,
    key: "ROLE_PATIENT",
    name: "Пациент",
  },
  {
    id: 6,
    key: "ROLE_GUEST",
    name: "Гость",
  },
];