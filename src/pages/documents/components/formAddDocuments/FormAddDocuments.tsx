import React, { useContext } from "react";
import { getRefValue } from "src/utils/GetRef";
import { ErrorMessage } from "src/components/errorMessage/ErrorMessage";
import { ModalContext } from "src/components/modal/Modal";
import styles from "./FormAddDocuments.module.less";

export const FormAddDocuments = ({
  title,
  isLoading,
  handleChangeFile,
  handleSubmit,
  messages,
  reset,
  fileSelected,
}: any) => {
  const refDesc = React.createRef<HTMLInputElement>();
  const refName = React.createRef<HTMLInputElement>();
  const refFile = React.createRef<HTMLInputElement>();

  const changeVisible = useContext(ModalContext);

  const handlePick = () => {
    if (refFile.current) refFile.current.click();
  };

  return (
    <div className={styles.documents_item_add__container}>
      <header className={styles.form_documents__header}>
        <div className={styles.form_documents__header_title}>{title}</div>
      </header>
      <div className={`${styles.form_documents} ${styles.form_documents_add}`}>
        <div className={styles.form_documents__text_field}>
          <input
            ref={refName}
            type="text"
            placeholder="Название"
            className={styles.documents_item_add__text_field}
          />
        </div>
        <div className={styles.form_documents__text_field}>
          <input
            ref={refDesc}
            type="text"
            placeholder="Описание"
            className={styles.documents_item_add__text_field}
          />
        </div>
        {/* FILE */}
        <div className={styles.form_documents__file_field}>
          <button
            className={`${styles.form_documents__button} 

            ${styles.form_documents__button_file}`}
            type="button"
            onClick={handlePick}
          >
            {fileSelected
              ? `Выбран файл: ${fileSelected.name}`
              : "Прикрепить файл"}
          </button>
          <input
            ref={refFile}
            className={styles.documents_item_add__hidden}
            type="file"
            onChange={(event) => handleChangeFile(event.target.files)}
            accept="application/pdf"
          />
        </div>
        <ErrorMessage errorMessages={messages} callbackReset={reset} />
        <div className={styles.documents_item_add__controls}>
          <button
            type="button"
            className={`${styles.form_documents__button} ${styles.form_documents__button_secondary}`}
            onClick={() => changeVisible?.()}
          >
            ОТМЕНИТЬ
          </button>
          <button
            className={`${styles.form_documents__button} ${styles.form_documents__button_primary}`}
            type="button"
            onClick={() =>
              handleSubmit({
                name: getRefValue(refName, ""),
                description: getRefValue(refDesc, ""),
              })
            }
          >
            Сохранить
          </button>
        </div>
        {isLoading ? (
          <div style={{ margin: "0 auto" }}>Загружаю... </div>
        ) : null}
      </div>
    </div>
  );
};
