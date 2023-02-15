export interface IDocuments {
  id: number;
  name: string;
  filePath: string;
  description: string;
}

export interface DocumentsCreateOptions {
  name: string;
  filePath: string;
  description: string;
}

export interface IDocumentsAdmin {
  id: number;
  name: string;
  filePath: string;
  description: string;
  status: string;
  createDate: string;
}

export interface DocumentsOptions {
  body: IDocuments;
  id: number;
}

export interface IDocumentsPagination {
  pages: number;
  elements: IDocumentsAdmin[];
}
