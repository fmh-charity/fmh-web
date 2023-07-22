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
  roleRank: number;
};

// App
export const APP_ROLES: Role[] = [
  {
    id: 1,
    roleType: "ROLE_ADMINISTRATOR",
    roleName: "Администратор системы",
    roleRank: 10,
  },
  {
    id: 2,
    roleType: "ROLE_MEDICAL_WORKER",
    roleName: "Медработник",
    roleRank: 5,
  },
  {
    id: 3,
    roleType: "ROLE_VOLUNTEER",
    roleName: "Волонтер",
    roleRank: 3,
  },
  {
    id: 4,
    roleType: "ROLE_VOLUNTEER_COORDINATOR",
    roleName: "Координатор волонтеров",
    roleRank: 4,
  },
  {
    id: 5,
    roleType: "ROLE_PATIENT",
    roleName: "Пациент",
    roleRank: 2,
  },
  {
    id: 6,
    roleType: "ROLE_GUEST",
    roleName: "Гость",
    roleRank: 1,
  },
];

export const getRoleNameByType: (roleType: Roles) => Role | undefined = (
  roleType: Roles
) => APP_ROLES.find((r) => r.roleType === roleType);

export const getRoleByRank: (roles: string[]) => Role = (roles: string[]) => {
  const f = APP_ROLES.filter((r) => roles.includes(r.roleType)).sort((a, b) =>
    a.roleRank > b.roleRank ? 1 : -1
  );
  return f[f.length - 1];
};
