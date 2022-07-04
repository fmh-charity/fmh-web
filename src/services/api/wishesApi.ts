import { createApi } from "@reduxjs/toolkit/query/react";
import { IWishes } from "src/pages/wishes/WishesPage";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";
import { IWishesComment } from "src/pages/wishes/components/wishesComments/WishesComments";

export const wishesApi = createApi({
  reducerPath: "wishesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["IWishes", "IWishesComment"],
  endpoints: (builder) => ({
    getWishes: builder.query<IWishes[], void>({
      query: () => "wishes",
      providesTags: ["IWishes"],
    }),
    getWishesById: builder.query<IWishes, string>({
      query: (id: string) => `wishes/${id}`,
      providesTags: ["IWishes"],
    }),
    addWishes: builder.mutation<IWishes, IWishes>({
      query: (body) => ({
        url: "wishes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IWishes"],
    }),
    updateWishes: builder.mutation<IWishes, IWishes>({
      query: (body) => ({
        url: "wishes",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["IWishes"],
    }),
    getWishesComments: builder.query<IWishesComment[], string>({
      query: (id: string) => `wishes/${id}/comments`,
      providesTags: ["IWishesComment"],
    }),
    addWishesComments: builder.mutation<IWishesComment, IWishesComment>({
      query: (body: IWishesComment) => ({
        url: `wishes/${body.wishesId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["IWishesComment"],
    }),
  }),
});

export const {
  useGetWishesQuery,
  useLazyGetWishesByIdQuery,
  useAddWishesMutation,
  useUpdateWishesMutation,
  useGetWishesCommentsQuery,
  useAddWishesCommentsMutation,
} = wishesApi;
