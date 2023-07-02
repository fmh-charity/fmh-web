export type Roles =
  | "ROLE_SYSTEM"
  | "ROLE_ADMINISTRATOR"
  | "ROLE_MEDICAL_WORKER"
  | "ROLE_VOLUNTEER"
  | "ROLE_VOLUNTEER_COORDINATOR"
  | "ROLE_PATIENT"
  | "ROLE_GUEST";

export type Role = {
  id: number;
  key: Roles;
  name: string;
};

// App
export const APP_ROLES: Role[] = [
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
