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
  roleType: Roles;
  roleName: string;
};

// App
export const APP_ROLES: Role[] = [
  {
    id: 1,
    roleType: "ROLE_ADMINISTRATOR",
    roleName: "Администратор системы",
  },
  {
    id: 2,
    roleType: "ROLE_MEDICAL_WORKER",
    roleName: "Медработник",
  },
  {
    id: 3,
    roleType: "ROLE_VOLUNTEER",
    roleName: "Волонтер",
  },
  {
    id: 4,
    roleType: "ROLE_VOLUNTEER_COORDINATOR",
    roleName: "Координатор волонтеров",
  },
  {
    id: 5,
    roleType: "ROLE_PATIENT",
    roleName: "Пациент",
  },
  {
    id: 6,
    roleType: "ROLE_GUEST",
    roleName: "Гость",
  },
];

export const getRoleNameByType: (roleType: Roles) => Role | undefined = (
  roleType: Roles
) => APP_ROLES.find((r) => r.roleType === roleType);
