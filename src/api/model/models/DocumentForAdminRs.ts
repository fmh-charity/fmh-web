/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDtoIdConcatFio } from "./UserDtoIdConcatFio";

/**
 * Основная информация по документу для администратора
 */
export type DocumentForAdminRs = {
  /**
   * id в системе
   */
  id?: number;
  /**
   * Имя документа
   */
  name?: string;
  /**
   * Ссылка на документ
   */
  filePath?: string;
  /**
   * Описание документа
   */
  description?: string;
  /**
   * Статус документа
   */
  status?: "NEW" | "PUBLISHED" | "ARCHIVED";
  /**
   * Дата создания
   */
  createDate?: string;
  userDtoIdConcatFio?: UserDtoIdConcatFio;
};
