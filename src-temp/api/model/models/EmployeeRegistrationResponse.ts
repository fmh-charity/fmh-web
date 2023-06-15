/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Информация для регистрации сотрудника
 */
export type EmployeeRegistrationResponse = {
  /**
   * id сотрудника
   */
  employeeId?: number;
  /**
   * Фамилия сотрудника
   */
  lastName?: string;
  /**
   * Имя сотрудника
   */
  firstName?: string;
  /**
   * Отчуство сотрудника
   */
  middleName?: string;
  /**
   * Электронная почта сотрудника
   */
  email?: string;
  /**
   * День рождения сотрудника
   */
  dateOfBirth?: string;
  /**
   * Должность
   */
  position?: string;
  /**
   * Описание сотрудника
   */
  description?: string;
  /**
   * Тип графика используемый для автозаполнения
   */
  scheduleType?: "FIVE_TWO" | "TWO_TWO" | "ONE_THREE";
  /**
   * Дата отсчета для скользящих графиков работы (для автозаполнения графика)
   */
  scheduleStartDate?: string;
  workStartTime?: Record<string, any>;
  workEndTime?: Record<string, any>;
  active?: boolean;
};
