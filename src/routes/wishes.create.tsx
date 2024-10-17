import { json } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import * as api from "../api";
import { WishesCreate } from "../pages/wishes-create";
import { RolesType } from "../common/roles";
import { withRole } from "./with-role";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async () => {
    const [patients, users] = await Promise.all([
      api.patients.patientsQuery(queryClient, [
        "ACTIVE",
        "DISCHARGED",
        "EXPECTED",
      ]),
      api.users.usersQuery(queryClient),
    ]);

    const wish = {};

    return json({ wish, patients, users });
  };

const requiredRoles: RolesType[] = [
  RolesType.ROLE_ADMINISTRATOR, 
  RolesType.ROLE_MEDICAL_WORKER,
  RolesType.ROLE_VOLUNTEER,
  RolesType.ROLE_VOLUNTEER_COORDINATOR
];

const WishesRouteComponent: React.FC = () => {
  return <WishesCreate />;
};

export const WishesCreateRoute = withRole(WishesRouteComponent, requiredRoles);