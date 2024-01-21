/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Новости
 */
export type NewsCreateDto = {
  /**
   * Идентификатор категории новости
   */
  newsCategoryId?: number;
  /**
   * Заголовок новости
   */
  title?: string;
  /**
   * Описание новости
   */
  description?: string;
};
