export interface IDocuments {
  id: number;
  name: string;
  filePath: string;
  description: string;
}

export interface DocumentsOptions {
  body: IDocuments;
  id: number;
}
