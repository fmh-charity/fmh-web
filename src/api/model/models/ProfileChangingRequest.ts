/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Информация для обновления пользователя
 */
export type ProfileChangingRequest = {
  /**
   * Фамилия
   */
  lastName: string;
  /**
   * Имя
   */
  firstName: string;
  /**
   * Отчество
   */
  middleName: string;
  /**
   * Дата рождения
   */
  dateOfBirth: string;
  /**
   * Электронная почта
   */
  email: string;
  /**
   * Множество идентификаторов ролей пользователя
   */
  roleIds: Array<number>;
};
