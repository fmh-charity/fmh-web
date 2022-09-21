export interface INews {
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string;
  id: number;
  newsCategoryId: number;
  publishDate: number;
  publishEnabled: boolean;
  title: string;
}

export interface INewsPagination {
  pages: number;
  elements: INews[];
}
