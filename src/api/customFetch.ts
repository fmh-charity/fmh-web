import { configureRefreshFetch, fetchJSON } from "refresh-fetch";
import {
  LOGIN_LOCALSTORAGE_KEY,
  USERINFO_LOCALSTORAGE_KEY,
} from "../common/constants";
import type { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import { notification } from "../common/notifications";
import type { ActionFunction, LoaderFunction } from "react-router-dom";

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
    window.location.reload();
    console.error(e);
  }
  return null;
};

const saveToken = (token: any) => {
  window.localStorage.setItem(LOGIN_LOCALSTORAGE_KEY, token);
};

const clearToken = () => {
  window.localStorage.removeItem(LOGIN_LOCALSTORAGE_KEY);
  window.localStorage.removeItem(USERINFO_LOCALSTORAGE_KEY);
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
    error.response.status === 401 ||
    (error.status === 500 && error.body.message === "Access Denied")
    // error.response.statusText === "Unauthorized"
  );
};

const refreshToken = async () => {
  console.log("refreshToken");
  try {
    const response = await fetchJSONWithToken(
      "/api/fmh/authentication/refresh",
      {
        method: "POST",
        body: JSON.stringify({
          refreshToken: retrieveRefreshToken(),
        }),
      }
    );
    if (response) {
      saveToken(response.body);
    }
    return response;
  } catch (error) {
    clearToken();
    // notification.addNotification({
    //   label: "Ошибка",
    //   text: JSON.stringify(error),
    // });
    throw error;
  }
};

export const customFetch = configureRefreshFetch({
  shouldRefreshToken,
  refreshToken,
  fetch: fetchJSONWithToken,
});

/**
 * 
 * @param queryClient 
 * 
 * React-query client
 * 
 * @param url 
 * 
 * rest api url 
 * 
 * look at swagger
 * https://test.vhospice.org/api/fmh/swagger-ui/index.html
 * 
 * @param options 
 * 
 * RequestInit options
 * 
 * @param body 
 * 
 * accept json
 * 
 * @param queryOptions 
 * 
 * React-query request options
 * 
 * @returns 
 * 
 * React-query return fetchQuery instance
 * 
 
 usage example:

 data?: NewsPaginationDto - request parameters

 const newsQuery: NewsDto[] - response data

 export const newsQuery = (queryClient: QueryClient, data?: NewsPaginationDto) =>
  createQuery<NewsDto[], typeof data>(
    queryClient,
    "/api/fmh/news",
    requestInitGetJSON,
    {
      queryKey: [""],
    },
    data,
  );
 */

interface CreateQuery {
  <U, T>(
    queryClient: QueryClient,
    url: string,
    options: RequestInit,
    queryOptions: FetchQueryOptions<T, unknown, U, (string | number)[]>,
    body?: T
  ): Promise<{ body: U; error: any }>;
  <U>(
    queryClient: QueryClient,
    url: string,
    options: RequestInit,
    queryOptions: FetchQueryOptions<unknown, unknown, U, (string | number)[]>,
    body?: undefined
  ): Promise<{ body: U; error: any }>;
}

export const createQuery: CreateQuery = <U, T>(
  queryClient: QueryClient,
  url: string,
  options: RequestInit,
  queryOptions: FetchQueryOptions<T, unknown, U, (string | number)[]>,
  body?: T
) => {
  return queryClient.fetchQuery({
    ...queryOptions,
    queryFn: async () => {
      return customFetch(
        url,
        body ? Object.assign(options, { body: JSON.stringify(body) }) : options
      )
        .then((r: { body: U }) => ({ body: r.body }))
        .catch((error: Error) => ({ error }));
    },
  });
};

export interface CreateLoader {
  (queryClient: QueryClient): LoaderFunction;
}

export interface CreateAction {
  (queryClient: QueryClient): ActionFunction;
}
