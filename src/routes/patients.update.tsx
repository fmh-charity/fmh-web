import { json } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import * as api from "../api";
import { RolesType } from "../common/roles";
import { withRole } from "./with-role";
import { PatientsUpdate } from "../pages/patients-update";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async ({params}) => {
    if (params.id) {
      const [patient] = await Promise.all([
        api.patients.patientByIdQuery(queryClient, params.id)
      ]);

      return json({ patient });
    }
  };

const requiredRoles: RolesType[] = [
  RolesType.ROLE_ADMINISTRATOR, 
  RolesType.ROLE_MEDICAL_WORKER,
  RolesType.ROLE_VOLUNTEER,
  RolesType.ROLE_VOLUNTEER_COORDINATOR
];

const PatientsUpdateRouteComponent: React.FC = () => {
  return <PatientsUpdate />;
};

export const PatientsUpdateRoute = withRole(PatientsUpdateRouteComponent, requiredRoles);
