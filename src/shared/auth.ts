import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { LOGIN_LOCALSTORAGE_KEY, USERINFO_LOCALSTORAGE_KEY } from "./contants";
import { notification } from "./notifications";

export const authBroadcastChannel = new BroadcastChannel(
  "auth-broadcast-channel"
);

const ensureSession = (key: string) => async (queryClient: QueryClient) => {
  let storageValue = null;
  try {
    const session = window?.localStorage.getItem(key);
    if (session) {
      storageValue = JSON.parse(session);
    }
  } catch (e) {
    doLogout(queryClient);
    console.error(e);
  }
  return storageValue;
};

export const ensureLogin = ensureSession(LOGIN_LOCALSTORAGE_KEY);
export const ensureUserInfo = ensureSession(USERINFO_LOCALSTORAGE_KEY);

export const doLogin = async (queryClient: QueryClient, data: any) => {
  try {
    const login = await queryClient.fetchQuery(
      api.authentication.loginQuery(data)
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (login?.code === "ERR_INVALID_LOGIN") {
      return login;
    }

    window.localStorage.setItem(LOGIN_LOCALSTORAGE_KEY, JSON.stringify(login));

    const userInfo = await queryClient.fetchQuery(
      api.authentication.userInfoQuery()
    );

    window.localStorage.setItem(
      USERINFO_LOCALSTORAGE_KEY,
      JSON.stringify(userInfo)
    );

    authBroadcastChannel.postMessage({ type: "login" });
  } catch (error) {
    window.localStorage.removeItem(LOGIN_LOCALSTORAGE_KEY);
    window.localStorage.removeItem(USERINFO_LOCALSTORAGE_KEY);
    const { message, stack } = error as Error;
    console.log({ error });
    notification.addNotification({ label: message, text: stack });
    return { error: (error as Error).message };
  }
};

export const doLogout = async (queryClient: QueryClient) => {
  window.localStorage.removeItem(LOGIN_LOCALSTORAGE_KEY);
  window.localStorage.removeItem(USERINFO_LOCALSTORAGE_KEY);
  await queryClient.resetQueries();
  authBroadcastChannel.postMessage({ type: "logout" });
};
