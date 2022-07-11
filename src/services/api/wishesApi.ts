import { createApi } from "@reduxjs/toolkit/query/react";
import { IWishes } from "src/pages/wishes/WishesPage";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";
import { IWishComment } from "src/pages/wishes/components/viewWishesCard/ViewWihes";

export const wishesApi = createApi({
  reducerPath: "wishesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["IWishes", "IWishComment"],
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
    getWishesComments: builder.query<IWishComment[], string>({
      query: (id: string) => `wishes/${id}/comments`,
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
