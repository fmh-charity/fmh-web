import React from "react";
import { useAppSelector } from "src/app/hooks";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import { selectUserInfo } from "src/features/auth/authSlice";

import {
  useGetDocumentsAdminQuery,
  useGetDocumentsQuery,
} from "src/services/api/documentsApi";
import DocumentsNode from "../../components/documentsNode/DocumentsNode";

const DocumentsListAdmin = () => (
  <PaginateComponent
    useQuery={useGetDocumentsAdminQuery}
    CardNode={DocumentsNode}
  />
);
const DocumentsListUser = () => (
  <PaginateComponent useQuery={useGetDocumentsQuery} CardNode={DocumentsNode} />
);

export const DocumentsList = () => {
  const user = useAppSelector(selectUserInfo);
  const isAdmin = user && user.admin;
  return isAdmin ? <DocumentsListAdmin /> : <DocumentsListUser />;
};
