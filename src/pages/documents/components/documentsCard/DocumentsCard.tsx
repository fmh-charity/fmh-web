import React, { FC, useContext } from "react";
import Modal, { ModalContext } from "src/components/modal/Modal";
import {
  useDeleteDocumentsMutation,
  useEditDocumentsMutation,
  useGetDocumentsByIdQuery,
} from "src/services/api/documentsApi";
import EditIcon from "src/assets/icons/edit_icon.svg";
import DeleteIcon from "src/assets/icons/Delete.svg";
import ConfirmComponent from "src/components/confirmComponent/ConfirmComponent";
import { IsAdmin } from "src/components/isAdmin/isAdmin";
import { statuses } from "src/common/statuses";
import { IDocuments, IDocumentsAdmin } from "src/model/IDocument";
import { FormEditDocuments } from "../formEditDocuments/FormEditDocuments";
import styles from "./DocumentsCard.module.less";

const EditComp = ({ docsId }: { docsId: number }) => {
  const { data } = useGetDocumentsByIdQuery(docsId);
  const [edit] = useEditDocumentsMutation();
  return (
    <FormEditDocuments docs={data} submit={edit} title="Изменить документ" />
  );
};

const DeleteComp = ({ docsId }: { docsId: number }) => {
  const changeVisible = useContext(ModalContext);
  const [delDocumentsMutation] = useDeleteDocumentsMutation();
  const delDocuments = (del: boolean) => {
    if (del) {
      delDocumentsMutation(docsId);
    } else {
      changeVisible?.();
    }
  };
  return (
    <ConfirmComponent callbackConfirm={delDocuments} text="Удалить документ?" />
  );
};

const EditIconComp = () => {
  const changeVisible = useContext(ModalContext);
  return <EditIcon onClick={() => changeVisible?.()} />;
};

const DeleteIconComp = () => {
  const changeVisible = useContext(ModalContext);
  return <DeleteIcon onClick={() => changeVisible?.()} />;
};

export const DocumentsCard: FC<IDocuments | IDocumentsAdmin> = ({
  status,
  id,
  name,
  filePath,
  description,
}: any) => (
  <div className={styles.documents_list_comp__item}>
    <div className={styles.documents_list_comp__item_head}>{name}</div>
    <div className={styles.documents_list_comp__content}>
      {description ? <div>Описание: {description}</div> : null}
      <div>
        Файл: <a href={`http://${filePath}`}>{filePath}</a>
      </div>
      {status ? (
        <div>Статус: {statuses[status as keyof typeof statuses]}</div>
      ) : null}
    </div>
    <div className={styles.documents_list_comp__footer}>
      <IsAdmin>
        <Modal modal={<EditComp docsId={id} />}>
          <EditIconComp />
        </Modal>
      </IsAdmin>
      <IsAdmin>
        <Modal modal={<DeleteComp docsId={id} />}>
          <DeleteIconComp />
        </Modal>
      </IsAdmin>
    </div>
  </div>
);
