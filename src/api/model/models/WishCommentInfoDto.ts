/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDtoIdFio } from "./UserDtoIdFio";

/**
 * Информация о комментарии к заявке
 */
export type WishCommentInfoDto = {
  userDtoIdFio?: UserDtoIdFio;
  /**
   * Время создания комментария к просьбе
   */
  createTime?: number;
  /**
   * Текст комментария к просьбе
   */
  description?: string;
  /**
   * Идентификатор комментария к просьбе
   */
  id?: number;
};
