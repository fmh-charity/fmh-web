import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AP from "src/config/ApplicationProperties";
import { IClaims } from "src/pages/claims/ClaimsPage";
import { Authorization } from "src/utils/Auth";

// TODO Check auth
export const claimsApi = createApi({
  reducerPath: "claimsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AP.HOST}/fmh/`,
    prepareHeaders: (headers) => {
      const response: string | null = localStorage.getItem("authorization");
      const auth: Authorization = response !== null ? JSON.parse(response) : "";

      headers.set("authorization", auth.accessToken);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getClaims: builder.query<IClaims[], string>({
      query: () => "claims",
    }),
  }),
});

export const { useGetClaimsQuery } = claimsApi;
