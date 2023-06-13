/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDtoIdFio } from './UserDtoIdFio';

/**
 * Основная информация по созданному документу
 */
export type DocumentCreationDtoRs = {
    /**
     * id в системе
     */
    id?: number;
    /**
     * Имя документа
     */
    name?: string;
    /**
     * Описание документа
     */
    description?: string;
    /**
     * Ссылка на документ
     */
    filePath?: string;
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

