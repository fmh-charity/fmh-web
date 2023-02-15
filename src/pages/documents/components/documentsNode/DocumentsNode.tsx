import React from "react";
import { DocumentsCard } from "../documentsCard/DocumentsCard";

import styles from "./DocumentsNode.module.less";

const DocumentsNode = ({ data }: any) =>
  data && data.length > 0 ? (
    <div className={styles.documents_page__container}>
      {data?.map((documents: any) => (
        <DocumentsCard
          key={documents.id}
          id={documents.id}
          name={documents.name}
          createDate={documents.createDate}
          filePath={documents.filePath}
          status={documents.status}
          description={documents.description}
        />
      ))}
    </div>
  ) : (
    <h1>На данный момент документов нет</h1>
  );

export default DocumentsNode;
