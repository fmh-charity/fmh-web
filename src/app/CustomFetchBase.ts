import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { tokenReceived, loggedOut } from "src/features/auth/authSlice";
import { environment } from "src/common/environment";
import { UserResponse } from "src/services/api/authApi";
import { RootState } from "./store";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${environment.API_HOST}/fmh/`,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;

    headers.set("authorization", accessToken);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const { refreshToken } = (api.getState() as RootState).auth;
      try {
        const refreshResult = await baseQuery(
          {
            url: "authentication/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(tokenReceived(refreshResult.data as UserResponse));
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem("authorization");
          localStorage.removeItem("userInfo");
          api.dispatch(loggedOut());
        }
      } finally {
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
