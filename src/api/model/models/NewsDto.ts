/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Новости
 */
export type NewsDto = {
  /**
   * Идентификатор новости
   */
  id?: number;
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
  /**
   * Идентификатор создателя
   */
  creatorId?: number;
  /**
   * Дата создания
   */
  createDate?: number;
  /**
   * Дата для публикации
   */
  publishDate?: number;
  /**
   * Признак для публикации новости
   */
  publishEnabled?: boolean;
  /**
   * ФИО создателя
   */
  creatorName?: string;
};
