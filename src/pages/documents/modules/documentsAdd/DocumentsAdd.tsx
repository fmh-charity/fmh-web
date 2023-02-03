import React from "react";
import {
  useAddDocumentsMutation,
  useUploadDocumentsMutation,
} from "src/services/api/documentsApi";

import { FormAddDocuments } from "../../components/formAddDocuments/FormAddDocuments";

export const DocumentsAdd = () => {
  const [addDocument] = useAddDocumentsMutation();
  const [upload, { isLoading }] = useUploadDocumentsMutation();

  return (
    <FormAddDocuments
      upload={upload}
      isLoading={isLoading}
      title="Добавить документ"
      submit={addDocument}
    />
  );
};
