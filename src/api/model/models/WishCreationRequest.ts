/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Объект запроса на создание просьбы
 */
export type WishCreationRequest = {
    /**
     * Идентификатор пациента
     */
    patientId?: number;
    /**
     * Тема просьбы
     */
    title: string;
    /**
     * Описание записки
     */
    description?: string;
    /**
     * Плановая дата исполнения
     */
    planExecuteDate?: string;
    /**
     * Область видимости
     */
    wishVisibility?: Array<number>;
};

