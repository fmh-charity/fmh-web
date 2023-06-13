/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Основная информация по пациенту для запроса по редактированию
 */
export type PatientUpdateInfoDtoRq = {
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
  middleName: string;
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
   * Идентификатор палаты
   */
  room?: number;
};
