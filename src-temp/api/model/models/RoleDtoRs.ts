/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Основная информация по роли в системе
 */
export type RoleDtoRs = {
  /**
   * id в системе
   */
  id?: number;
  /**
   * Имя роли
   */
  name?: string;
  /**
   * Описание документа
   */
  description?: string;
  /**
   * Флаг подверждения получения
   */
  needConfirm?: boolean;
};
