/* eslint-disable no-unused-vars */

import { ensureUserInfo } from "./auth";

export enum RolesType {
  ROLE_SYSTEM = "ROLE_SYSTEM",
  ROLE_ADMINISTRATOR = "ROLE_ADMINISTRATOR",
  ROLE_MEDICAL_WORKER = "ROLE_MEDICAL_WORKER",
  ROLE_VOLUNTEER = "ROLE_VOLUNTEER",
  ROLE_VOLUNTEER_COORDINATOR = "ROLE_VOLUNTEER_COORDINATOR",
  ROLE_PATIENT = "ROLE_PATIENT",
  ROLE_GUEST = "ROLE_GUEST",
}


export type Roles =
  | RolesType.ROLE_SYSTEM
  | RolesType.ROLE_ADMINISTRATOR
  | RolesType.ROLE_MEDICAL_WORKER
  | RolesType.ROLE_VOLUNTEER
  | RolesType.ROLE_VOLUNTEER_COORDINATOR
  | RolesType.ROLE_PATIENT
  | RolesType.ROLE_GUEST

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
    roleType: RolesType.ROLE_ADMINISTRATOR,
    roleName: "Администратор системы",
    roleRank: 10,
  },
  {
    id: 2,
    roleType: RolesType.ROLE_MEDICAL_WORKER,
    roleName: "Медработник",
    roleRank: 5,
  },
  {
    id: 3,
    roleType: RolesType.ROLE_VOLUNTEER,
    roleName: "Волонтер",
    roleRank: 3,
  },
  {
    id: 4,
    roleType: RolesType.ROLE_VOLUNTEER_COORDINATOR,
    roleName: "Координатор волонтеров",
    roleRank: 4,
  },
  {
    id: 5,
    roleType: RolesType.ROLE_PATIENT,
    roleName: "Пациент",
    roleRank: 2,
  },
  {
    id: 6,
    roleType: RolesType.ROLE_GUEST,
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


export const commonRoles = (roles: RolesType[]) => {
  const userInfo = ensureUserInfo();
  return roles.filter(element => userInfo?.roles?.includes(element));
};