/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NewsDto } from "./NewsDto";

export type NewsPaginationDto = {
  pages?: number;
  elements?: Array<NewsDto>;
};
