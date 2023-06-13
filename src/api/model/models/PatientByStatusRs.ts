/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomDtoRs } from './RoomDtoRs';

/**
 * Пациент + госпитализации
 */
export type PatientByStatusRs = {
    /**
     * id пациента
     */
    id?: number;
    /**
     * Имя пациента
     */
    firstName?: string;
    /**
     * Фамилия пациента
     */
    lastName?: string;
    /**
     * Отчество пациента
     */
    middleName?: string;
    /**
     * Дата рождения пациента
     */
    birthday?: string;
    /**
     * Фактическая/плановая дата поступления
     */
    dateIn?: string;
    /**
     * Фактическая/плановая дата выписки
     */
    dateOut?: string;
    /**
     * Признак фактической даты поступления
     */
    dateInBoolean?: boolean;
    /**
     * Признак для даты выписки
     */
    dateOutBoolean?: boolean;
    /**
     * Статус госпитализации
     */
    status?: 'DISCHARGED' | 'ACTIVE' | 'EXPECTED';
    room?: RoomDtoRs;
};

