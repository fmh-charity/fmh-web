import * as api from ".";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import type { ProfileChangingRequest, UserInfoDto, UserShortInfoDto } from "./model";
import { REGISTRATION_QUERY, USERS_QUERY, USERS_UPDATE_BY_ID_QUERY } from "../common/constants";

export const usersQuery = (queryClient: QueryClient) =>
  createQuery<UserShortInfoDto[]>(
    queryClient,
    "/users",
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [REGISTRATION_QUERY],
    }
  );

  export const userByIdQuery = (
    queryClient: QueryClient,
    id: number | string
  ) =>
    createQuery<UserInfoDto>(
      queryClient,
      "/users/" + id,
      api.requestInit.RequestInitGetJSON,
      {
        queryKey: [USERS_QUERY, id],
      }
    );
  
export const updateUserByIdQuery = (
  queryClient: QueryClient,
  data: ProfileChangingRequest,
  id: number | string,
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
