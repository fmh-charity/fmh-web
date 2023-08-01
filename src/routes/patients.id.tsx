import { json } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { PatientsId } from "../pages/patients-id";

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

export const PatientsIdRoute = () => {
  return <PatientsId />;
};
