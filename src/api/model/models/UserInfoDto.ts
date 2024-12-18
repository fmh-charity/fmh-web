/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserEmailDto } from "./UserEmailDto";
import type { UserRoleClaimDto } from "./UserRoleClaimDto";

/**
 * Информация по пользователю
 */
export type UserInfoDto = {
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
  email?: UserEmailDto;
  /**
   * Множество ролей
   */
  roleIds?: Array<number>;
  roles?: string[];
  userRoleClaim?: UserRoleClaimDto;
  admin?: boolean;
  confirmed?: boolean;
  password?: string;
  dateOfBirth?: string;
};
