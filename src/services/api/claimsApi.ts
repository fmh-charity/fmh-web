import { createApi } from "@reduxjs/toolkit/query/react";
import { IClaims } from "src/pages/claims/ClaimsPage";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";
import { IClaimComment } from "src/pages/claims/components/claimComments/ClaimComments";

export const claimsApi = createApi({
  reducerPath: "claimsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["IClaims", "IClaimComment"],
  endpoints: (builder) => ({
    getClaims: builder.query<IClaims[], void>({
      query: () => "claims",
      providesTags: ["IClaims"],
    }),
    getClaimById: builder.query<IClaims, string>({
      query: (id: string) => `claims/${id}`,
      providesTags: ["IClaims"],
    }),
    addClaims: builder.mutation<IClaims, IClaims>({
      query: (body) => ({
        url: "claims",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IClaims"],
    }),
    updateClaims: builder.mutation<IClaims, IClaims>({
      query: (body) => ({
        url: "claims",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["IClaims"],
    }),
    getClaimComments: builder.query<IClaimComment[], string>({
      query: (id: string) => `claims/${id}/comments`,
      providesTags: ["IClaimComment"],
    }),
    addClaimComments: builder.mutation<IClaimComment, IClaimComment>({
      query: (body: IClaimComment) => ({
        url: `claims/${body.claimId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["IClaimComment"],
    }),
  }),
});

export const {
  useGetClaimsQuery,
  useLazyGetClaimByIdQuery,
  useAddClaimsMutation,
  useUpdateClaimsMutation,
  useGetClaimCommentsQuery,
  useAddClaimCommentsMutation,
} = claimsApi;
