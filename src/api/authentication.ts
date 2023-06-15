import type {
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
} from "../shared/contants";
import { customFetch } from ".";

/**
 *
 * loginQuery uses original "fetch" function
 * all others required authentication endpoints uses "customFetch" function
 *
 * @param data { login: string, password: string }
 * @returns
 */

export const loginQuery = (data: LoginRequest) => ({
  queryKey: [LOGIN_QUERY],
  queryFn: async () => {
    return fetch("/api/fmh/authentication/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((r) => r.text());
  },
  ...{
    staleTime: 0, // override main staleTime
  },
});

export const userInfoQuery = () => ({
  queryKey: [USERINFO_QUERY],
  queryFn: async () => {
    return customFetch("/api/fmh/authentication/userInfo", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((r: { body: UserShortInfoDto }) => r.body);
  },
  ...{
    staleTime: 0, // override main staleTime
  },
});

export const rolesQuery = () => ({
  queryKey: [ROLES_QUERY],
  queryFn: async () => {
    return customFetch("/api/fmh/authentication/roles", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then((r: { body: RoleDtoRs[] }) => r.body);
  },
  ...{
    staleTime: 0, // override main staleTime
  },
});

export const registrationQuery = (data: RegistrationRequest) => ({
  queryKey: [REGISTRATION_QUERY],
  queryFn: async () => {
    return customFetch("/api/fmh/authentication/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((r: { body: any }) => {
      console.log("registrationQuery", r);
      return r.body;
    });
  },
  ...{
    staleTime: 0, // override main staleTime
  },
});
