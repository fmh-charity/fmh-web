import { createApi } from "@reduxjs/toolkit/query/react";
import { INews, INewsPagination } from "src/model/INews";
import { NewsPost } from "src/pages/news/components/addNews/AddNews";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";
import { IPaginationOptions } from "src/model/IPaginationOptions";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["INews", "INewsPagination"],
  endpoints: (builder) => ({
    getNews: builder.query<INewsPagination, IPaginationOptions>({
      query: ({ pages, elements, publishDate }) => ({
        url: "news",
        params: {
          pages,
          elements,
          publishDate,
        },
      }),
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
