import { QueryClient } from "@tanstack/react-query";
import { AUTH_LOCALSTORAGE_QUERY } from "./contants";
import { loginQuery, userInfoQuery } from "../api";

export const authBroadcastChannel = new BroadcastChannel(
  "auth-broadcast-channel"
);

export const ensureSession = async (queryClient: QueryClient) => {
  let storageValue = null;
  try {
    const session = window?.localStorage.getItem(AUTH_LOCALSTORAGE_QUERY);
    if (session) {
      storageValue = JSON.parse(session);
    }
  } catch (e) {
    doLogout(queryClient);
    console.error(e);
  }
  return storageValue;
};

export const doLogin = async (queryClient: QueryClient, data: any) => {
  const login = await queryClient.fetchQuery(loginQuery(data));
  if (login && login.accessToken) {
    const userInfo = await queryClient.fetchQuery(
      userInfoQuery(login.accessToken)
    );
    window.localStorage.setItem(
      AUTH_LOCALSTORAGE_QUERY,
      JSON.stringify({ login, userInfo })
    );
    authBroadcastChannel.postMessage({ type: "login" });
  }
};

export const doLogout = async (queryClient: QueryClient) => {
  window.localStorage.removeItem(AUTH_LOCALSTORAGE_QUERY);
  await queryClient.resetQueries();
  authBroadcastChannel.postMessage({ type: "logout" });
};
