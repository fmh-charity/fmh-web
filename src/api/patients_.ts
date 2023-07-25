import * as api from ".";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import { PATIENS_QUERY } from "../common/constants";
import type { PatientByStatusRs, UserShortInfoDto } from "./model";

export const patientsQuery = (
  queryClient: QueryClient,
  statuses: PatientByStatusRs["status"][]
) =>
  createQuery<PatientByStatusRs[]>(
    queryClient,
    "/api/fmh/patients?" +
      statuses.map((status) => "statuses=" + status).join("&"),
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [PATIENS_QUERY],
    }
  );

// TODO
export const usersQuery = (queryClient: QueryClient) =>
  createQuery<UserShortInfoDto[]>(
    queryClient,
    "/api/fmh/users",
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: ["USERS"], // TODO
    }
  );
