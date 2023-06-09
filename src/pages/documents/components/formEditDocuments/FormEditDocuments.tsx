import React, { useContext, useState } from "react";
import { ModalContext } from "src/components/modal/Modal";
import styles from "./FormEditDocuments.module.less";

export const FormEditDocuments = ({ title, docs, submit }: any) => {
  const statusObj = {
    NEW: "НОВЫЙ",
    PUBLISHED: "ОПУБЛИКОВАН",
    ARCHIVED: "В АРХИВЕ",
  };
  const statusList = Object.entries(statusObj);
  const [formData, setFormData] = useState({});
  const changeVisible = useContext(ModalContext);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    const obj = {
      name: docs.name,
      description: docs.description,
      userId: docs.user.id,
    };
    try {
      await submit({ id: docs.id, body: { ...formData, ...obj } }).then(() => {
        changeVisible?.();
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (docs) {
    const { status } = docs;

    return (
      <div className={styles.form_documents__container}>
        <header className={styles.form_documents__header}>
          <div className={styles.form_documents__header_title}>{title}</div>
        </header>
        <div
          className={`${styles.form_documents} ${styles.form_documents_edit}`}
        >
          <div className={styles.form_documents_edit__item}>
            Название
            <input defaultValue={docs.name} />
          </div>
          <div className={styles.form_documents_edit__item}>
            Описание
            <input defaultValue={docs.description} />
          </div>
          <div className={styles.form_documents_edit__item}>
            Статус
            <select
              defaultValue={status}
              name="status"
              onChange={(e) => handleChange(e)}
            >
              {statusList.map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.form_documents__controls}>
            <button
              className={`${styles.form_documents__button} ${styles.form_documents__button_primary}`}
              type="button"
              onClick={() => handleSubmit()}
            >
              СОХРАНИТЬ
            </button>
            <button
              type="button"
              className={`${styles.form_documents__button} ${styles.form_documents__button_secondary}`}
              onClick={() => changeVisible?.()}
            >
              ОТМЕНИТЬ
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <>error</>;
};
