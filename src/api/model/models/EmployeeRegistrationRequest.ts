/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Информация для регистрации сотрудника
 */
export type EmployeeRegistrationRequest = {
    /**
     * Фамилия сотрудника
     */
    lastName: string;
    /**
     * Имя сотрудника
     */
    firstName: string;
    /**
     * Отчество сотрудника
     */
    middleName?: string;
    /**
     * Адрес электронной почты сотрудника
     */
    email?: string;
    /**
     * День рождения сотрудника
     */
    dateOfBirth?: string;
    /**
     * id должности
     */
    positionId?: number;
    /**
     * Описание сотрудника
     */
    description?: string;
    /**
     * Тип графика используемый для автозаполнения
     */
    scheduleType?: 'FIVE_TWO' | 'TWO_TWO' | 'ONE_THREE';
    /**
     * Дата отсчета для скользящих графиков работы (для автозаполнения графика)
     */
    scheduleStartDate?: string;
    workStartTime?: Record<string, any>;
    workEndTime?: Record<string, any>;
};

