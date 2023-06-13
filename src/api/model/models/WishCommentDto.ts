/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Комментарий к заявке
 */
export type WishCommentDto = {
  /**
   * Идентификатор комментария к просьбе
   */
  id?: number;
  /**
   * Идентификатор просьбы к которой создан комментарий
   */
  wishId?: number;
  /**
   * Описание комментария к просьбе
   */
  description?: string;
  /**
   * Идентификатор создателя комментария к просьбе
   */
  creatorId?: number;
  /**
   * Дата создания комментария к просьбе
   */
  createDate?: number;
};
