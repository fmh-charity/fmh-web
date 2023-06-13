/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Объект запроса на обновление просьбы
 */
export type WishUpdateRequest = {
    /**
     * Идентификатор пациента
     */
    patientId?: number;
    /**
     * Тема просьбы
     */
    title: string;
    /**
     * Идентификатор исполнителя
     */
    executorId?: number;
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

