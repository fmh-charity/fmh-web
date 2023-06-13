/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Основная информация для создания пациента
 */
export type PatientCreateInfoDtoRq = {
  /**
   * Имя пациента
   */
  firstName: string;
  /**
   * Фамилия пациента
   */
  lastName: string;
  /**
   * Отчество пациента
   */
  middleName?: string;
  /**
   * Дата рождения пациента
   */
  birthDate?: string;
  /**
   * Фактическая/плановая дата поступления
   */
  dateIn?: string;
  /**
   * Фактическая/плановая дата выписки
   */
  dateOut?: string;
  /**
   * Признак фактической даты поступления
   */
  dateInBoolean?: boolean;
  /**
   * Признак для даты выписки
   */
  dateOutBoolean?: boolean;
  /**
   * Статус госпитализации
   */
  status?: "DISCHARGED" | "ACTIVE" | "EXPECTED";
  /**
   * Информация о палате
   */
  room?: number;
};
