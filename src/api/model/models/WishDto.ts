/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PatientDtoIdFio } from "./PatientDtoIdFio";
import type { RoomDtoRs } from "./RoomDtoRs";
import type { UserDtoIdFio } from "./UserDtoIdFio";
import type { WishExecutorDtoRs } from "./WishExecutorDtoRs";

/**
 * Просьба
 */
export type WishDto = {
  /**
   * Идентификатор записки
   */
  id?: number;
  patient?: PatientDtoIdFio;
  /**
   * Тема просьбы
   */
  title?: string;
  /**
   * Описание записки
   */
  description?: string;
  creator?: UserDtoIdFio;
  executor?: UserDtoIdFio;
  /**
   * Дата создания
   */
  createDate?: number;
  /**
   * Плановая дата исполнения
   */
  planExecuteDate?: number;
  /**
   * Фактическая дата исполнения
   */
  factExecuteDate?: number;
  /**
   * Статус записки
   */
  status?:
    | "IN_PROGRESS"
    | "CANCELLED"
    | "OPEN"
    | "EXECUTED"
    | "READY"
    | "READY_CHECK";
  room?: RoomDtoRs;
  /**
   * Область видимости
   */
  wishVisibility?: Array<number>;
  /**
   * Список исполнителей просьбы
   */
  wishExecutors?: Array<WishExecutorDtoRs>;
  /**
   * Приоритет просьбы
   */
  wishPriority?: "RED" | "YELLOW" | "GREEN";
};
