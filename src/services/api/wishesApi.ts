import { createApi } from "@reduxjs/toolkit/query/react";
import { IWish } from "src/model/IWish";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";
import { IWishComment } from "src/pages/wishes/components/viewWishesCard/ViewWihes";

export const wishesApi = createApi({
  reducerPath: "wishesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["IWishes", "IWishComment"],
  endpoints: (builder) => ({
    getWishes: builder.query<IWish[], void>({
      query: () => "wishes",
      providesTags: ["IWishes"],
    }),
    getWishesById: builder.query<IWish, number>({
      query: (id: number) => `wishes/${id}`,
      providesTags: ["IWishes"],
    }),
    addWishes: builder.mutation<IWish, IWish>({
      query: (body) => ({
        url: "wishes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IWishes"],
    }),
    updateWishes: builder.mutation<IWish, IWish>({
      query: (body) => ({
        url: "wishes",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["IWishes"],
    }),
    getWishesComments: builder.query<IWishComment[], number>({
      query: (id: number) => `wishes/${id}/comments`,
      providesTags: ["IWishComment"],
    }),
    addWishesComments: builder.mutation<IWishComment, IWishComment>({
      query: (body: IWishComment) => ({
        url: `wishes/${body.objId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["IWishComment"],
    }),
  }),
});

export const {
  useGetWishesQuery,
  useGetWishesByIdQuery,
  useLazyGetWishesByIdQuery,
  useAddWishesMutation,
  useUpdateWishesMutation,
  useGetWishesCommentsQuery,
  useAddWishesCommentsMutation,
} = wishesApi;
