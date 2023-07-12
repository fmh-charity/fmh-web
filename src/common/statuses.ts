import type { WishDto } from "../api/model";

export const statuses: { [K in keyof WishDto["status"]]?: string } = {
  IN_PROGRESS: "В работе",
  CANCELLED: "Отмена",
  OPEN: "Новая",
  EXECUTED: "Исполнена",
  READY: "Готово",
  READY_CHECK: "Проверка",
};
