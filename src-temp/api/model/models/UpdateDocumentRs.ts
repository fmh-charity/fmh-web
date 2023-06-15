/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDtoIdFio } from "./UserDtoIdFio";

/**
 * Основная информация по документу для возврата измененного документа
 */
export type UpdateDocumentRs = {
  /**
   * Идентификатор документа
   */
  id?: number;
  /**
   * Имя документа
   */
  name?: string;
  /**
   * Ссылка на файл
   */
  filePath?: string;
  /**
   * Описание документа
   */
  description?: string;
  /**
   * Флаг удаления документа
   */
  deleted?: boolean;
  /**
   * Статус документа
   */
  status?: "NEW" | "PUBLISHED" | "ARCHIVED";
  /**
   * Дата создания документа
   */
  createDate?: string;
  userDtoIdFio?: UserDtoIdFio;
};
