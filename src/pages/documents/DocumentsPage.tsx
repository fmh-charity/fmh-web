import React, { useContext } from "react";
import { IsAdmin } from "src/components/isAdmin/isAdmin";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import Modal, { ModalContext } from "src/components/modal/Modal";
import { useAppDispatch } from "src/app/hooks";
import { toggleSort } from "src/features/sort/appSlice";
import { DocumentsAdd } from "./modules/documentsAdd/DocumentsAdd";
import { DocumentsList } from "./modules/documentsList/DocumentsList";

import styles from "./Documents.module.less";

const SortIconComponent = () => {
  const dispatch = useAppDispatch();
  return <SortIcon onClick={() => dispatch(toggleSort())} />;
};

const AddIconComponent = () => {
  const changeVisible = useContext(ModalContext);
  return <AddIcon onClick={changeVisible} />;
};

export const DocumentsPage = () => (
  <div className={styles.documents_page__wrapper}>
    <header className={styles.documents_page__header}>
      <div className={styles.documents_page__header_title}>Документы</div>
      <div className={styles.documents_page__header_icons}>
        <IsAdmin>
          <Modal modal={<DocumentsAdd />}>
            <AddIconComponent />
          </Modal>
        </IsAdmin>
        <SortIconComponent />
      </div>
    </header>
    <DocumentsList />
  </div>
);
