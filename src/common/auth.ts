import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { LOGIN_LOCALSTORAGE_KEY, USERINFO_LOCALSTORAGE_KEY } from "./constants";
import { notification } from "./notifications";
import type { JwtResponse, LoginRequest, UserInfoDto } from "../api/model";

export const authBroadcastChannel = new BroadcastChannel(
  "auth-broadcast-channel"
);

const ensureSession =
  <T>(key: string): ((queryClient?: QueryClient) => Promise<T>) =>
  async (queryClient?: QueryClient) => {
    let storageValue = null;
    try {
      const session = window?.localStorage.getItem(key);
      if (session) {
        storageValue = JSON.parse(session);
      }
    } catch (e) {
      if (queryClient) {
        doLogout(queryClient);
      }
      console.error(e);
    }
    return storageValue;
  };


  interface ParsedUserInfo {
    body:UserInfoDto
  }

export const ensureLogin = ensureSession<JwtResponse>(LOGIN_LOCALSTORAGE_KEY);
export const ensureUserInfo = ensureSession<ParsedUserInfo>(
  USERINFO_LOCALSTORAGE_KEY
);

export const doLogin = async (queryClient: QueryClient, data: LoginRequest) => {
  try {
    const login = await api.authentication.loginQuery(queryClient, data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (login?.code === "ERR_INVALID_LOGIN") {
      return login;
    }

    window.localStorage.setItem(LOGIN_LOCALSTORAGE_KEY, JSON.stringify(login));

    const userInfo = await api.authentication.userInfoQuery(queryClient);

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
