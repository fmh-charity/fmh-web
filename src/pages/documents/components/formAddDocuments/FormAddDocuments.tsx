import React, { useState } from "react";
import { getRefValue } from "src/utils/GetRef";
import { useValidation } from "src/hooks/useValidation/useValidation";
import { ErrorMessage } from "src/components/errorMessage/ErrorMessage";
import { object, string, number } from "yup";
import { StatusMessage } from "src/components/statusMesage/StatusMessage";
import styles from "./FormAddDocuments.module.less";

export const FormAddDocuments = ({ title, submit, upload, isLoading }: any) => {
  const fileSchema = object().shape({
    fileSize: number().required().max(10000000).label("Размер файла"),
  });

  const docsSchema = object().shape({
    name: string().required().min(2).max(50).label("Название"),
    description: string().required().min(10).max(250).label("Описание"),
  });

  const refDesc = React.createRef<HTMLInputElement>();
  const refName = React.createRef<HTMLInputElement>();
  const refFile = React.createRef<HTMLInputElement>();

  const [fileSelected, setSelectedFile] = useState<File>();
  const [status, setStatus] = useState(false);
  const handleChangeFile = (event: any) => {
    const file = event.target.files[0];
    reset();
    fileSchema
      .validate(
        {
          fileSize: file.size,
        },
        { abortEarly: false }
      )
      .then(() => {
        setStatus(true);
        setter([`Выбран файл: ${file.name}`]);
        setSelectedFile(event.target.files[0]);
      })
      .catch((e) => {
        setStatus(false);
        setter(e.errors);
      });
  };

  const [setter, messages, reset] = useValidation();

  const handleSubmit = async () => {
    if (!fileSelected) {
      setter(["Файл не выбран"]);
      return;
    }
    const form = {
      name: getRefValue(refName, ""),
      description: getRefValue(refDesc, ""),
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
        const res = await upload(formData);
        form.filePath = res.data;
        await submit(form);
        // changeVisible?.();
      })
      .catch((e) => {
        setStatus(false);
        setter(e.errors);
      });
  };

  const handlePick = () => {
    if (refFile.current) refFile.current.click();
  };

  return (
    <div className={styles.documents_item_add__container}>
      <div className={styles.documents_item_add}>
        {title}
        <input
          ref={refName}
          type="text"
          placeholder="Название"
          className={styles.documents_item_add__text_field}
        />
        <input
          ref={refDesc}
          type="text"
          placeholder="Описание"
          className={styles.documents_item_add__text_field}
        />
        <input
          ref={refFile}
          className={styles.documents_item_add__hidden}
          type="file"
          onChange={handleChangeFile}
          accept="application/pdf"
        />
        <div className={styles.documents_item_add__controls}>
          <button
            className={`${styles.documents_item_add__button} ${styles.documents_item_add__button_secondary}`}
            type="button"
            onClick={handlePick}
          >
            Прикрепить файл
          </button>
          <button
            className={`${styles.documents_item_add__button} ${styles.documents_item_add__button_primary}`}
            type="button"
            onClick={handleSubmit}
          >
            Сохранить
          </button>
        </div>
        <div className={styles.documents_item_add__status}>
          {isLoading ? "Загружаю..." : ""}
          {status ? (
            <StatusMessage
              statusMessages={messages}
              callbackReset={() => reset()}
            />
          ) : (
            <ErrorMessage
              errorMessages={messages}
              callbackReset={() => reset()}
            />
          )}
        </div>
      </div>
    </div>
  );
};
