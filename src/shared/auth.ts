import * as api from "../api";
import { QueryClient } from "@tanstack/react-query";
import { LOGIN_LOCALSTORAGE_KEY, USERINFO_LOCALSTORAGE_KEY } from "./contants";

export const authBroadcastChannel = new BroadcastChannel(
  "auth-broadcast-channel"
);

export const ensureSession = async (queryClient: QueryClient) => {
  let storageValue = null;
  try {
    const session = window?.localStorage.getItem(LOGIN_LOCALSTORAGE_KEY);
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
  const login = await queryClient.fetchQuery(
    api.authentication.loginQuery(data)
  );
  if (login) {
    window.localStorage.setItem(LOGIN_LOCALSTORAGE_KEY, login);

    const userInfo = await queryClient.fetchQuery(
      api.authentication.userInfoQuery()
    );
    window.localStorage.setItem(
      USERINFO_LOCALSTORAGE_KEY,
      JSON.stringify(userInfo)
    );

    authBroadcastChannel.postMessage({ type: "login" });
  }
};

export const doLogout = async (queryClient: QueryClient) => {
  window.localStorage.removeItem(LOGIN_LOCALSTORAGE_KEY);
  window.localStorage.removeItem(USERINFO_LOCALSTORAGE_KEY);
  await queryClient.resetQueries();
  authBroadcastChannel.postMessage({ type: "logout" });
};
