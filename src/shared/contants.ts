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

export const APP_ROLES: { [key: string]: string } = {
  ROLE_GUEST: "Гость",
  ROLE_ADMINISTRATOR: "Администратор системы",
  ROLE_MEDICAL_WORKER: "Медработник",
  ROLE_VOLUNTEER: "Волонтер",
  ROLE_VOLUNTEER_COORDINATOR: "Координатор волонтеров",
  ROLE_PATIENT: "Пациент",
};
