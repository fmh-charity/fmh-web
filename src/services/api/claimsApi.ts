import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IClaims } from "src/pages/claims/ClaimsPage";
import { environment } from "src/common/environment";
import { RootState } from "src/app/store";

export const claimsApi = createApi({
  reducerPath: "claimsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.API_HOST}:${environment.API_PORT}/fmh/`,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).auth;

      headers.set("authorization", accessToken);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getClaims: builder.query<IClaims[], void>({
      query: () => "claims",
    }),
  }),
});

export const { useGetClaimsQuery } = claimsApi;
