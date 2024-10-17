import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { LOGIN_LOCALSTORAGE_KEY, USERINFO_LOCALSTORAGE_KEY } from "./constants";
import type { JwtResponse, LoginRequest, UserInfoDto } from "../api/model";

export const authBroadcastChannel = new BroadcastChannel(
  "auth-broadcast-channel"
);

const ensureSession =
  <T>(key: string): ((queryClient?: QueryClient) => T) =>
  (queryClient?: QueryClient) => {
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

export const ensureLogin = ensureSession<JwtResponse>(LOGIN_LOCALSTORAGE_KEY);
export const ensureUserInfo = ensureSession<UserInfoDto>(
  USERINFO_LOCALSTORAGE_KEY
);

export const doLogin = async (queryClient: QueryClient, data: LoginRequest) => {
  try {
    const loginRequest = await api.authentication.loginQuery(queryClient, data);
    const { error: errorLogin, body: login } = loginRequest;

    if (errorLogin) {
      throw errorLogin;
    }

    window.localStorage.setItem(LOGIN_LOCALSTORAGE_KEY, JSON.stringify(login));

    const { error: userInfoError, body: userInfo } =
      await api.authentication.userInfoQuery(queryClient);

    if (userInfoError) {
      throw userInfoError;
    }

    window.localStorage.setItem(
      USERINFO_LOCALSTORAGE_KEY,
      JSON.stringify(userInfo)
    );

    authBroadcastChannel.postMessage({ type: "login" });

    return loginRequest;
  } catch (error) {
    window.localStorage.removeItem(LOGIN_LOCALSTORAGE_KEY);
    window.localStorage.removeItem(USERINFO_LOCALSTORAGE_KEY);
    return { error };
  }
};

export const doLogout = async (queryClient: QueryClient) => {
  window.localStorage.removeItem(LOGIN_LOCALSTORAGE_KEY);
  window.localStorage.removeItem(USERINFO_LOCALSTORAGE_KEY);
  await queryClient.resetQueries();
  authBroadcastChannel.postMessage({ type: "logout" });
};
