import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INews } from "src/pages/news/NewsPage";
import { environment } from "src/common/environment";
import { RootState } from "src/app/store";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.API_HOST}:${environment.API_PORT}/fmh/`,
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = (getState() as RootState).auth;

      headers.set("authorization", accessToken);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getNews: builder.query<INews[], string>({
      query: () => "news",
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
