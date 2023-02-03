import React from "react";
import { IsAdmin } from "src/components/isAdmin/isAdmin";
import { DocumentsAdd } from "./modules/documentsAdd/DocumentsAdd";
import { DocumentsList } from "./modules/documentsList/DocumentsList";
import { DocumentsListAdmin } from "./modules/documentsListAdmin/DocumentsListAdmin";
import styles from "./Documents.module.less";

export const DocumentsPage = () => (
  <div className={styles.documents_page__wrapper}>
    <header className={styles.documents_page__header}>
      <div className={styles.documents_page__header_title}>Документы</div>
    </header>
    <DocumentsAdd />
    <DocumentsList />
    <IsAdmin>
      <DocumentsListAdmin />
    </IsAdmin>
  </div>
);
