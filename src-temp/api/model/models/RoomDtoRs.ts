/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Палаты
 */
export type RoomDtoRs = {
  /**
   * Идентификатор палаты
   */
  id?: number;
  /**
   * Название палаты
   */
  name?: string;
  /**
   * Идентификатор поста
   */
  nurseStationId?: number;
  /**
   * Количество доступных мест
   */
  maxOccupancy?: number;
  /**
   * Комментарий
   */
  comment?: string;
};
