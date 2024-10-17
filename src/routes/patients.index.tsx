import { json } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { PatientsIndex } from "../pages/patients-index";
import { RolesType } from "../common/roles";
import { withRole } from "./with-role";

export const loader = (queryClient: QueryClient) => async () => {
  const patients = await api.patients.patientsQuery(queryClient);
  return json(patients);
};

const requiredRoles: RolesType[] = [RolesType.ROLE_ADMINISTRATOR, RolesType.ROLE_MEDICAL_WORKER];

const PatientsRouteComponent: React.FC = () => {
  return <PatientsIndex />;
};

export const PatientsIndexRoute = withRole(PatientsRouteComponent, requiredRoles);