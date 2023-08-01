import type { PatientByStatusRs, WishDto } from "../api/model";

export const wishStatuses: { [K in keyof WishDto["status"]]?: string } = {
  IN_PROGRESS: "В работе",
  CANCELLED: "Отмена",
  OPEN: "Новая",
  EXECUTED: "Исполнена",
  READY: "Готово",
  READY_CHECK: "Проверка",
};

export const patientStatuses: {
  [K in keyof PatientByStatusRs["status"]]?: string;
} = {
  DISCHARGED: "Выписан",
  ACTIVE: "В хосписе",
  EXPECTED: "Новый",
};
