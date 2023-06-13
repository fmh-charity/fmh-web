/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDtoIdFio } from './UserDtoIdFio';

/**
 * Основная информация по id документа
 */
export type DocumentByIdRs = {
    /**
     * id в системе
     */
    id?: number;
    /**
     * Имя документа
     */
    name?: string;
    /**
     * Ссылка на документ
     */
    filePath?: string;
    /**
     * Описание документа
     */
    description?: string;
    /**
     * Флаг удаления
     */
    deleted?: boolean;
    /**
     * Статус документа
     */
    status?: 'NEW' | 'PUBLISHED' | 'ARCHIVED';
    /**
     * Дата создания
     */
    createDate?: string;
    userDtoIdFio?: UserDtoIdFio;
};

