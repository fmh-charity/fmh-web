/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Заявка на роль пользователя, средняя
 */
export type UserRoleClaimDto = {
    /**
     * Идентификатор пользователя
     */
    id?: number;
    /**
     * Название роли
     */
    role?: string;
    /**
     * Статус заявки на роль пользователя
     */
    status?: 'NEW' | 'CONFIRMED' | 'REJECTED';
    /**
     * Дата создания заявки на роль
     */
    createdAt?: string;
};

