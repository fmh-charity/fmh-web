import * as api from ".";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import type { ProfileChangingRequest, UserShortInfoDto } from "./model";
import { USERS_QUERY, USERS_UPDATE_BY_ID_QUERY } from "../common/constants";

export const usersQuery = (queryClient: QueryClient) =>
  createQuery<UserShortInfoDto[]>(
    queryClient,
    "/users",
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [USERS_QUERY],
    }
  );

export const updateUserByIdQuery = (
  queryClient: QueryClient,
  data: ProfileChangingRequest,
  id: number
) =>
  createQuery<undefined, ProfileChangingRequest>(
    queryClient,
    `/users/${id}`,
    api.requestInit.RequestInitPutJSON,
    {
      queryKey: [USERS_UPDATE_BY_ID_QUERY],
    },
    data
  );
