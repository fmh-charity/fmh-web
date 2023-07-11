import * as api from "../api";
import type {
  JwtResponse,
  LoginRequest,
  RegistrationRequest,
  RoleDtoRs,
  UserShortInfoDto,
} from "./model";
import {
  LOGIN_QUERY,
  REGISTRATION_QUERY,
  ROLES_QUERY,
  USERINFO_QUERY,
} from "../common/constants";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";

/**
 *
 * loginQuery uses original "fetch" function
 * all others required authentication endpoints uses "customFetch" function
 *
 * @param data { login: string, password: string }
 * @returns
 */

export const loginQuery = (queryClient: QueryClient, data: LoginRequest) =>
  queryClient.fetchQuery<typeof data, unknown, JwtResponse, string[]>({
    queryKey: [LOGIN_QUERY],
    queryFn: async () => {
      return fetch("/api/fmh/authentication/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((r) => r.json())
        .catch((r) => r);
    },
  });

export const userInfoQuery = (queryClient: QueryClient) =>
  createQuery<UserShortInfoDto>(
    queryClient,
    "/api/fmh/authentication/userInfo",
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [USERINFO_QUERY],
    }
  );

export const rolesQuery = (queryClient: QueryClient) =>
  createQuery<RoleDtoRs[]>(
    queryClient,
    "/api/fmh/authentication/roles",
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [ROLES_QUERY],
    }
  );

export const registrationQuery = (
  queryClient: QueryClient,
  data: RegistrationRequest
) =>
  createQuery<undefined, typeof data>(
    queryClient,
    "/api/fmh/authentication/registration",
    api.requestInit.RequestInitPostJSON,
    {
      queryKey: [REGISTRATION_QUERY],
    },
    data
  );
