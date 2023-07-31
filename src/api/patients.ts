import * as api from ".";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import { PATIENS_QUERY } from "../common/constants";
import type { PatientByStatusRs } from "./model";

export const patientsQuery = (
  queryClient: QueryClient,
  statuses?: PatientByStatusRs["status"][]
) =>
  createQuery<PatientByStatusRs[]>(
    queryClient,
    "/api/fmh/patients?" +
      (statuses || ["DISCHARGED", "ACTIVE", "EXPECTED"])
        ?.map((status) => "statuses=" + status)
        .join("&"),
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [PATIENS_QUERY],
    }
  );
