/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Форма регистрации пользователя
 */
export type RegistrationRequest = {
    /**
     * Имя
     */
    firstName: string;
    /**
     * Фамилия
     */
    lastName: string;
    /**
     * Отчество
     */
    middleName?: string;
    /**
     * Дата рождения
     */
    dateOfBirth?: string;
    /**
     * Идентификаторы желаемых ролей
     */
    roleIds?: Array<number>;
    /**
     * Адрес электронной почты
     */
    email?: string;
    /**
     * Пароль
     */
    password?: string;
};

