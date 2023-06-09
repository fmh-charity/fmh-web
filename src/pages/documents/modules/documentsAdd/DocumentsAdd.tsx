import React, { useContext, useState } from "react";
import { ModalContext } from "src/components/modal/Modal";
import { useValidation } from "src/hooks/useValidation/useValidation";
import {
  useAddDocumentsMutation,
  useUploadDocumentsMutation,
} from "src/services/api/documentsApi";
import { object, number, string } from "yup";
import { FormAddDocuments } from "../../components/formAddDocuments/FormAddDocuments";

export const DocumentsAdd = () => {
  const [submit] = useAddDocumentsMutation();
  const [upload, { isLoading }] = useUploadDocumentsMutation();

  const fileSchema = object().shape({
    fileSize: number().required().max(10000000).label("Размер файла"),
  });
  const docsSchema = object().shape({
    name: string().required().min(2).max(50).label("Название"),
    description: string().required().min(10).max(250).label("Описание"),
  });

  const [fileSelected, setSelectedFile] = useState<File>();
  const [setter, messages, reset] = useValidation();

  const changeVisible = useContext(ModalContext);

  const handleSubmit = async (inputsData: any) => {
    if (!fileSelected) {
      setter(["Файл не выбран"]);
      return;
    }
    const form = {
      name: inputsData.name,
      description: inputsData.description,
      filePath: "",
    };

    const formData = new FormData();
    formData.append("postcard_image", fileSelected);
    await docsSchema
      .validate(
        {
          name: form.name,
          description: form.description,
        },
        { abortEarly: false }
      )
      .then(async () => {
        reset();
        const res = await upload(formData);
        if ("data" in res) {
          form.filePath = res.data;
          await submit(form);
          changeVisible?.();
        }
      })
      .catch((e) => {
        setter(e.errors);
      });
  };

  const handleChangeFile = (files: any) => {
    const file = files[0];
    reset();
    fileSchema
      .validate(
        {
          fileSize: file.size,
        },
        { abortEarly: false }
      )
      .then(() => {
        setSelectedFile(file);
      })
      .catch((e) => {
        setSelectedFile(undefined);
        setter(e.errors);
      });
  };

  return (
    <FormAddDocuments
      title="Добавить документ"
      handleSubmit={handleSubmit}
      handleChangeFile={handleChangeFile}
      isLoading={isLoading}
      messages={messages}
      fileSelected={fileSelected}
    />
  );
};
