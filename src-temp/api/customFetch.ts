import { configureRefreshFetch, fetchJSON } from "refresh-fetch";
import { LOGIN_LOCALSTORAGE_KEY } from "../shared/contants";

const retrieveRefreshToken = () => {
  try {
    const session = window?.localStorage.getItem(LOGIN_LOCALSTORAGE_KEY);
    if (session) {
      return JSON.parse(session)?.refreshToken;
    }
  } catch (e) {
    clearToken();
    console.error(e);
  }
  return null;
};

const retrieveAccessToken = () => {
  try {
    const session = window?.localStorage.getItem(LOGIN_LOCALSTORAGE_KEY);
    if (session) {
      return JSON.parse(session)?.accessToken;
    }
  } catch (e) {
    clearToken();
    console.error(e);
  }
  return null;
};

const saveToken = (token: any) => {
  window.localStorage.setItem(LOGIN_LOCALSTORAGE_KEY, token);
};

const clearToken = () => {
  window.localStorage.removeItem(LOGIN_LOCALSTORAGE_KEY);
};

const fetchJSONWithToken = (url: any, options = {}) => {
  const token = retrieveAccessToken();

  const optionsWithToken = {
    ...options,
    headers: {
      ...(options as any).headers,
      authorization: token ?? undefined,
    },
  };

  return fetchJSON(url, optionsWithToken) as Promise<Response>;
};

const shouldRefreshToken = (error: any) => {
  console.log("shouldRefreshToken", error);
  return (
    // TODO check real message
    error.response.status === 401 && error.body.message === "Token has expired"
  );
};

const refreshToken = async () => {
  try {
    const response = await fetchJSONWithToken("/authentication/refresh", {
      method: "POST",
      body: JSON.stringify({
        refreshToken: retrieveRefreshToken(),
      }),
    });
    if (response) {
      saveToken(response.body);
    }
    return response;
  } catch (error) {
    clearToken();
    throw error;
  }
};

export const customFetch = configureRefreshFetch({
  shouldRefreshToken,
  refreshToken,
  fetch: fetchJSONWithToken,
});
