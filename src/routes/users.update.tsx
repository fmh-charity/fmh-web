import { json } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import * as api from "../api";
import { RolesType } from "../common/roles";
import { withRole } from "./with-role";
import { UsersUpdate } from "../pages/users-update";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async ({params}) => {
    if (params.id) {
      const [user] = await Promise.all([
        api.users.userByIdQuery(queryClient, params.id)
      ]);

      return json({ user });
    }
  };

const requiredRoles: RolesType[] = [
  RolesType.ROLE_ADMINISTRATOR, 
  RolesType.ROLE_MEDICAL_WORKER,
  RolesType.ROLE_VOLUNTEER,
  RolesType.ROLE_VOLUNTEER_COORDINATOR
];

const UsersUpdateRouteComponent: React.FC = () => {
  return <UsersUpdate />;
};

export const UsersUpdateRoute = withRole(UsersUpdateRouteComponent, requiredRoles);
