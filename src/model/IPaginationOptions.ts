export interface IPaginationOptions {
  pages: number;
  elements: number;
  status: string;
  sortByNewCreateDate?: boolean;
  publishDate?: boolean;
  publishDateTo?: string;
  publishDateFrom?: string;
  newsCategoryId?: number;
  isAscendingNameSort?: boolean;
}
