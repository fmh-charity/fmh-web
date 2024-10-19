import * as api from ".";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import { PATIENS_BY_ID_QUERY, PATIENS_CREATE_QUERY, PATIENS_DELETE_QUERY, PATIENS_QUERY, PATIENS_UPDATE_QUERY } from "../common/constants";
import type { PatientByStatusRs, PatientCreateInfoDtoRq, PatientDto } from "./model";

export const patientsQuery = (
  queryClient: QueryClient,
  statuses?: PatientByStatusRs["status"][]
) =>
  createQuery<PatientByStatusRs[]>(
    queryClient,
    "/patients?"
    +
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


export const patientCreateQuery = (
  queryClient: QueryClient,
  data: PatientCreateInfoDtoRq,
) =>
  createQuery<PatientDto, PatientCreateInfoDtoRq>(
    queryClient,
    "/patients",
    api.requestInit.RequestInitPostJSON,
    {
      queryKey: [PATIENS_CREATE_QUERY],
    },
    data
  );
  
export const patientUpdateQuery = (
  queryClient: QueryClient,
  data: PatientCreateInfoDtoRq,
  id: string
) =>
  createQuery<PatientDto, PatientCreateInfoDtoRq>(
    queryClient,
    "/patients/" + id,
    api.requestInit.RequestInitPutJSON,
    {
      queryKey: [PATIENS_UPDATE_QUERY],
    },
    data
  );

export const patientDeleteQuery = (
  queryClient: QueryClient,
  id: string
) =>
  createQuery<PatientDto, null>(
    queryClient,
    "/patients/" + id,
    api.requestInit.RequestInitDeleteJSON,
    {
      queryKey: [PATIENS_DELETE_QUERY],
    }
);