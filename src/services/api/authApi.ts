import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment } from "src/common/environment";

export interface UserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface UserInfoResponse {
  admin: boolean;
  firstName: string;
  id: number;
  lastName: string;
  middleName: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.API_HOST}:${environment.API_PORT}/fmh/authentication/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          window.localStorage.setItem("authorization", JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    userInfo: builder.query<UserInfoResponse, null>({
      query: () => "userInfo",
    }),
  }),
});

export const { useLoginMutation } = api;
export const { useLazyUserInfoQuery, useUserInfoQuery } = api;
