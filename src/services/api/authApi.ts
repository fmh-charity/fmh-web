import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "src/app/store";
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
  [x: string]: any;
  admin: boolean;
  firstName: string;
  id: number;
  lastName: string;
  middleName: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.API_HOST}:${environment.API_PORT}/fmh/authentication/`,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).auth;

      headers.set("authorization", accessToken);
      return headers;
    },
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
    userInfo: builder.query<UserInfoResponse, void>({
      query: () => "userInfo",

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          window.localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = api;
export const { useLazyUserInfoQuery, useUserInfoQuery } = api;
