import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INews } from "src/pages/news/NewsPage";
import { environment } from "src/common/environment";
import { RootState } from "src/app/store";
import { NewsPost } from "src/pages/news/components/addNews/AddNews";

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
  tagTypes: ["INews"],
  endpoints: (builder) => ({
    getNews: builder.query<INews[], void>({
      query: () => "news",
      providesTags: ["INews"],
    }),
    getNewsById: builder.query<INews, string>({
      query: (id) => `news/${id}`,
      providesTags: ["INews"],
    }),
    addNews: builder.mutation<NewsPost, NewsPost>({
      query: (body) => ({
        url: "news",
        method: "POST",
        body,
      }),
      invalidatesTags: ["INews"],
    }),
    editNews: builder.mutation<boolean, INews>({
      query: (body) => ({
        url: "news",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["INews"],
    }),
    deleteNews: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["INews"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useAddNewsMutation,
  useDeleteNewsMutation,
  useGetNewsByIdQuery,
  useLazyGetNewsByIdQuery,
  useEditNewsMutation,
} = newsApi;
