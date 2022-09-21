import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";
import { IClaimComment } from "src/pages/claims/components/viewClaimCard/ViewClaims";
import { IClaim, IClaimPagination } from "src/model/IClaim";

export const claimsApi = createApi({
  reducerPath: "claimsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["IClaims", "IClaimPagination", "IClaimComment"],
  endpoints: (builder) => ({
    getClaims: builder.query<IClaimPagination, void>({
      query: () => "claims",
      providesTags: ["IClaims"],
    }),
    getClaimById: builder.query<IClaim, number>({
      query: (id: number) => `claims/${id}`,
      providesTags: ["IClaims"],
    }),
    addClaims: builder.mutation<IClaim, IClaim>({
      query: (body) => ({
        url: "claims",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IClaims"],
    }),
    updateClaims: builder.mutation<IClaim, IClaim>({
      query: (body) => ({
        url: "claims",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["IClaims"],
    }),
    getClaimComments: builder.query<IClaimComment[], number>({
      query: (id: number) => `claims/${id}/comments`,
      providesTags: ["IClaimComment"],
    }),
    addClaimComments: builder.mutation<IClaimComment, IClaimComment>({
      query: (body: IClaimComment) => ({
        url: `claims/${body.objId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["IClaimComment"],
    }),
  }),
});

export const {
  useGetClaimsQuery,
  useGetClaimByIdQuery,
  useAddClaimsMutation,
  useUpdateClaimsMutation,
  useGetClaimCommentsQuery,
  useAddClaimCommentsMutation,
} = claimsApi;
