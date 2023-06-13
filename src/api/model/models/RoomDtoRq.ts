/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Палаты
 */
export type RoomDtoRq = {
  /**
   * Название палаты
   */
  name: string;
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
