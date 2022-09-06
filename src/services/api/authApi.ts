import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export interface UserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface IUserInfo {
  // [x: string]: any;
  admin: boolean;
  firstName: string;
  id: number;
  lastName: string;
  middleName: string;
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "authentication/login",
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
    userInfo: builder.query<IUserInfo, void>({
      query: () => "authentication/userInfo",

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
