/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Основная информация для создания документа
 */
export type DocumentCreationDtoRq = {
    /**
     * Имя документа
     */
    name: string;
    /**
     * Описание документа
     */
    description?: string;
    /**
     * Ссылка на документ
     */
    filePath: string;
};

