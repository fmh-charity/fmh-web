import { createApi } from "@reduxjs/toolkit/query/react";
import { IClaims } from "src/pages/claims/ClaimsPage";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export const claimsApi = createApi({
  reducerPath: "claimsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getClaims: builder.query<IClaims[], void>({
      query: () => "claims",
    }),
  }),
});

export const { useGetClaimsQuery } = claimsApi;
