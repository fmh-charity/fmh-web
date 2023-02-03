import React, { useContext } from "react";
import Modal, { ModalContext } from "src/components/modal/Modal";
import { IDocuments } from "src/model/IDocument";
import {
  useEditDocumentsMutation,
  useGetDocumentsByIdQuery,
} from "src/services/api/documentsApi";
import EditIcon from "src/assets/icons/edit_icon.svg";
import styles from "./DocumentsItem.module.less";
import { FormEditDocuments } from "../formEditDocuments/FormEditDocuments";

const EditComp = ({ docsId }: { docsId: number }) => {
  const { data } = useGetDocumentsByIdQuery(docsId);
  const [edit] = useEditDocumentsMutation();
  return (
    <FormEditDocuments docs={data} submit={edit} title="Изменить документ" />
  );
};

const EditIconComp = () => {
  const changeVisible = useContext(ModalContext);
  return <EditIcon onClick={() => changeVisible?.()} />;
};

export const DocumentsItem = ({ item }: { item: IDocuments }) => (
  <div className={styles.documents_list_comp__item}>
    <div className={styles.documents_list_comp__item_head}>{item.name}</div>
    <div className={styles.documents_list_comp__content}>
      <div>Описание: {item.description}</div>
      <div>Файл: {item.filePath}</div>
    </div>
    <div className={styles.documents_list_comp__footer}>
      <Modal modal={<EditComp docsId={item.id} />}>
        <EditIconComp />
      </Modal>
    </div>
  </div>
);
