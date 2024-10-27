/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEmailDto } from "./UserEmailDto";

/**
 * Общая информация по пользователю
 */
export type UserShortInfoDto = {
  /**
   * Идентификатор пользователя
   */
  id?: number;
  /**
   * Имя
   */
  firstName?: string;
  /**
   * Фамилия
   */
  lastName?: string;
  /**
   * Отчество
   */
  middleName?: string;
  /**
   * Множество ролей
   */
  roles?: Array<string>;
  roleIds?: Array<number>;
  email?: UserEmailDto;
  /**
   * Статус пользователя
   */
  isConfirmed?: boolean;
  admin?: boolean;
};
