import { LoginRequest, UserShortInfoDto } from "./model";
import { API_URL, LOGIN_QUERY, USERINFO_QUERY } from "../shared/contants";
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
    return fetch(`${API_URL + "/authentication/login"}`, {
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
    return customFetch(`${API_URL + "/authentication/userInfo"}`, {
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
  queryKey: [USERINFO_QUERY],
  queryFn: async () => {
    return customFetch(`${API_URL + "/authentication/userInfo"}`, {
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
