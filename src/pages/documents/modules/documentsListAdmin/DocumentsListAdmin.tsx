import React from "react";
import { IDocuments } from "src/model/IDocument";
import { useGetDocumentsQuery } from "src/services/api/documentsApi";
import styles from "./DocumentsListAdmin.module.less";
import { DocumentsItem } from "../../components/documentsItem/DocumentsItem";

export const DocumentsListAdmin: any = () => {
  const { data } = useGetDocumentsQuery("admin");

  return (
    <div className={styles.documents_list_comp__wrapper}>
      <div className={styles.documents_list_comp__body}>
        Список для админа
        {data?.map((item: IDocuments) => (
          <DocumentsItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
