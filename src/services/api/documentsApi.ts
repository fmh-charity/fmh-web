import { createApi } from "@reduxjs/toolkit/query/react";
import { DocumentsOptions, IDocuments } from "src/model/IDocument";
import { baseQueryWithReauth } from "src/app/CustomFetchBase";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["IDocuments"],
  endpoints: (builder) => ({
    getDocuments: builder.query<IDocuments[], string>({
      query: (admin) => ({
        url: `documents${admin ? "/admin" : ""}`,
      }),
      providesTags: ["IDocuments"],
    }),
    getDocumentsById: builder.query<IDocuments, number>({
      query: (id) => `documents/${id}`,
      providesTags: ["IDocuments"],
    }),
    addDocuments: builder.mutation<IDocuments, IDocuments>({
      query: (body) => ({
        url: "documents",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IDocuments"],
    }),
    uploadDocuments: builder.mutation<string, IDocuments>({
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
    // deleteNews: builder.mutation<boolean, number>({
    //   query: (id) => ({
    //     url: `news/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["INews"],
    // }),
  }),
});

export const {
  useGetDocumentsQuery,
  useAddDocumentsMutation,
  useUploadDocumentsMutation,
  // useDeleteNewsMutation,
  useGetDocumentsByIdQuery,
  // useLazyGetNewsByIdQuery,
  useEditDocumentsMutation,
} = documentsApi;
