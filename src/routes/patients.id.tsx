import { json } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { PatientsId } from "../pages/patients-id";
import { RolesType } from "../common/roles";
import { withRole } from "./with-role";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) =>
  async ({ params }) => {
    if (params.id) {
      const [patient] = await Promise.all([
        api.patients.patientByIdQuery(queryClient, params.id),
      ]);

      return json({ patient });
    }
  };

const requiredRoles: RolesType[] = [RolesType.ROLE_ADMINISTRATOR, RolesType.ROLE_MEDICAL_WORKER];

const PatientsRouteComponent: React.FC = () => {
  return <PatientsId />;
};

export const PatientsIdRoute = withRole(PatientsRouteComponent, requiredRoles);