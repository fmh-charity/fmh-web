import { json } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { PatientsIndex } from "../pages/patients-index";

export const loader = (queryClient: QueryClient) => async () => {
  const patients = await api.patients.patientsQuery(queryClient);
  return json(patients);
};

export const PatientsIndexRoute = () => {
  return <PatientsIndex />;
};
