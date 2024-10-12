import * as api from ".";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import { PATIENS_BY_ID_QUERY, PATIENS_QUERY } from "../common/constants";
import type { PatientByStatusRs } from "./model";

export const patientsQuery = (
  queryClient: QueryClient,
  statuses?: PatientByStatusRs["status"][]
) =>
  createQuery<PatientByStatusRs[]>(
    queryClient,
    "/patients?" +
      (statuses || ["DISCHARGED", "ACTIVE", "EXPECTED"])
        ?.map((status) => "statuses=" + status)
        .join("&"),
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [PATIENS_QUERY],
    }
  );

export const patientByIdQuery = (
  queryClient: QueryClient,
  id: number | string
) =>
  createQuery<PatientByStatusRs>(
    queryClient,
    "/patients/" + id,
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [PATIENS_BY_ID_QUERY, id],
    }
  );
