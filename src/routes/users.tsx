import { json } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { PatientsIndex } from "../pages/patients-index";
import { RolesType } from "../common/roles";
import { withRole } from "./with-role";
import { UsersIndex } from "../pages/users-index";

export const loader = (queryClient: QueryClient) => async () => {
  const users = await api.users.usersQuery(queryClient);
  return json(users);
};

const requiredRoles: RolesType[] = [RolesType.ROLE_ADMINISTRATOR, RolesType.ROLE_MEDICAL_WORKER];

const UsersRouteComponent: React.FC = () => {
  return <UsersIndex />;
};

export const UsersIndexRoute = withRole(UsersRouteComponent, requiredRoles);