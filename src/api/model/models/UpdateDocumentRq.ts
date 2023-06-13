/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Основная информация по документу для запроса по изменению
 */
export type UpdateDocumentRq = {
    /**
     * Имя документа
     */
    name: string;
    /**
     * Описание документа
     */
    description?: string;
    /**
     * Статус документа
     */
    status?: 'NEW' | 'PUBLISHED' | 'ARCHIVED';
    /**
     * Идентификатор пользователя
     */
    userId: number;
};

