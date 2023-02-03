import React from "react";
import { IDocuments } from "src/model/IDocument";
import { useGetDocumentsQuery } from "src/services/api/documentsApi";

export const DocumentsList: any = () => {
  const { data } = useGetDocumentsQuery("");
  return (
    <div>
      Список для пользователя
      {data?.map((item: IDocuments) => (
        <div key={item.id}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
};
