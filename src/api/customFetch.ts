import { configureRefreshFetch, fetchJSON } from "refresh-fetch";
import { LOGIN_LOCALSTORAGE_KEY } from "../shared/contants";
import type { FetchQueryOptions, QueryClient } from "@tanstack/react-query";

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
  createQuery<typeof data, NewsDto[]>(
    queryClient,
    "/api/fmh/news",
    requestInitGetJSON,
    data,
    {
      queryKey: [""],
    }
  );
 */

interface CreateQuery {
  <U, T>(
    queryClient: QueryClient,
    url: string,
    options: RequestInit,
    queryOptions: FetchQueryOptions<T, unknown, U, string[]>,
    body?: T
  ): Promise<U>;
  <U>(
    queryClient: QueryClient,
    url: string,
    options: RequestInit,
    queryOptions: FetchQueryOptions<unknown, unknown, U, string[]>,
    body?: undefined
  ): Promise<U>;
}

export const createQuery: CreateQuery = <U, T>(
  queryClient: QueryClient,
  url: string,
  options: RequestInit,
  queryOptions: FetchQueryOptions<T, unknown, U, string[]>,
  body?: T
) => {
  return queryClient.fetchQuery({
    ...queryOptions,
    queryFn: async () => {
      return customFetch(
        url,
        body ? Object.assign(options, { body: JSON.stringify(body) }) : options
      ).then((r: { body: U }) => r.body);
      // TODO catch
    },
  });
};
