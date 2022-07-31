import { createApi } from "@reduxjs/toolkit/query/react";
import { INews } from "src/model/INews";
import { NewsPost } from "src/pages/news/components/addNews/AddNews";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["INews"],
  endpoints: (builder) => ({
    getNews: builder.query<INews[], void>({
      query: () => "news",
      providesTags: ["INews"],
    }),
    getNewsById: builder.query<INews, number>({
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
