import { createApi } from "@reduxjs/toolkit/query/react";
import {
  DocumentsCreateOptions,
  DocumentsOptions,
  IDocuments,
  IDocumentsPagination,
} from "src/model/IDocument";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";
import { IPaginationOptions } from "src/model/IPaginationOptions";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["IDocuments"],
  endpoints: (builder) => ({
    getDocuments: builder.query<IDocumentsPagination, IPaginationOptions>({
      query: () => "documents",
      providesTags: ["IDocuments"],
    }),
    getDocumentsAdmin: builder.query<IDocumentsPagination, IPaginationOptions>({
      query: (isAscendingNameSort) => ({
        url: "documents/admin",
        providesTags: ["IDocuments"],
        params: isAscendingNameSort,
      }),
    }),
    getDocumentsById: builder.query<IDocuments, number>({
      query: (id) => `documents/${id}`,
      providesTags: ["IDocuments"],
    }),
    addDocuments: builder.mutation<IDocuments, DocumentsCreateOptions>({
      query: (body) => ({
        url: "documents",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IDocuments"],
    }),
    uploadDocuments: builder.mutation<string, FormData>({
      query: (body) => ({
        url: "documents/upload",
        method: "POST",
        body,
        responseHandler: "text",
      }),
      invalidatesTags: ["IDocuments"],
    }),
    editDocuments: builder.mutation<boolean, DocumentsOptions>({
      query: (data) => {
        const { id, body } = data;
        return {
          url: `documents/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["IDocuments"],
    }),
    deleteDocuments: builder.mutation<boolean, number>({
      query: (id) => ({
        url: `documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["IDocuments"],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentsAdminQuery,
  useAddDocumentsMutation,
  useUploadDocumentsMutation,
  useDeleteDocumentsMutation,
  useGetDocumentsByIdQuery,
  // useLazyGetNewsByIdQuery,
  useEditDocumentsMutation,
} = documentsApi;
