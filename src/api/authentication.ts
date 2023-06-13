import { JwtResponse, LoginRequest, UserShortInfoDto } from "./model";
import { API_URL, LOGIN_QUERY } from "../shared/contants";

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
    }).then((r) => r.json() as JwtResponse);
  },
  ...{
    staleTime: 0, // override main staleTime
  },
});

export const userInfoQuery = (accessToken: string) => ({
  queryKey: [LOGIN_QUERY],
  queryFn: async () => {
    return fetch(`${API_URL + "/authentication/userInfo"}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: accessToken,
      },
    }).then((r) => r.json() as UserShortInfoDto);
  },
  ...{
    staleTime: 0, // override main staleTime
  },
});
