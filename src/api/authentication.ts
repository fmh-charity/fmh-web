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

const baseUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_PREFIX}`;

export const loginQuery = (queryClient: QueryClient, data: LoginRequest) =>
  queryClient.fetchQuery<
    typeof data,
    unknown,
    { body: JwtResponse; error?: unknown },
    string[]
  >({
    queryKey: [LOGIN_QUERY],
    queryFn: async () => {
      try {
        const req = await fetch(`${baseUrl}/authentication/login`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (req.status !== 200) {
          throw Error(req.statusText);
        }
        const json = await req.json();
        return { body: json } as any;
      } catch (error) {
        return { error };
      }
    },
  });

export const userInfoQuery = (queryClient: QueryClient) =>
  createQuery<UserShortInfoDto>(
    queryClient,
    "/authentication/userInfo",
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [USERINFO_QUERY],
    }
  );

export const rolesQuery = (queryClient: QueryClient) =>
  createQuery<RoleDtoRs[]>(
    queryClient,
    "/authentication/roles",
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
    "/authentication/registration",
    api.requestInit.RequestInitPostJSON,
    {
      queryKey: [REGISTRATION_QUERY],
    },
    data
  );
