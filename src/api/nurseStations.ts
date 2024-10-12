import * as api from ".";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import type {
  NurseStationDto,
  NurseStationDtoRq,
  NurseStationDtoRs,
} from "./model";
import {
  NURSE_STATIONS_CREATE_QUERY,
  NURSE_STATIONS_ID_QUERY,
  NURSE_STATIONS_QUERY,
  NURSE_STATIONS_UPDATE_QUERY,
} from "../common/constants";

export const nurseStationsQuery = (queryClient: QueryClient) =>
  createQuery<NurseStationDto[]>(
    queryClient,
    "/nurse_stations",
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [NURSE_STATIONS_QUERY],
    }
  );

export const nurseStationByIdQuery = (
  queryClient: QueryClient,
  id: number | string
) =>
  createQuery<NurseStationDto>(
    queryClient,
    "/nurse_stations/" + id,
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [NURSE_STATIONS_ID_QUERY, id],
    }
  );

export const nurseStationCreateQuery = (
  queryClient: QueryClient,
  data: NurseStationDtoRq
) =>
  createQuery<NurseStationDtoRs, typeof data>(
    queryClient,
    "/nurse_stations",
    api.requestInit.RequestInitPostJSON,
    {
      queryKey: [NURSE_STATIONS_CREATE_QUERY],
    },
    data
  );

export const nurseStationUpdateQuery = (
  queryClient: QueryClient,
  id: number,
  data: NurseStationDtoRq
) =>
  createQuery<NurseStationDtoRs, typeof data>(
    queryClient,
    "/nurse_stations/" + id,
    api.requestInit.RequestInitPutJSON,
    {
      queryKey: [NURSE_STATIONS_UPDATE_QUERY],
    },
    data
  );
