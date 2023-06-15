/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserDtoIdFio } from "./UserDtoIdFio";

/**
 * Исполнитель просьбы
 */
export type WishExecutorDtoRs = {
  executor?: UserDtoIdFio;
  /**
   * Дата присоединения к просьбе
   */
  joinDate?: number;
  /**
   * Фактическая дата выполнения просьбы
   */
  finishDate?: number;
};
