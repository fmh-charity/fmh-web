import React from "react";
import { ScrollRestoration, useFetcher } from "react-router-dom";
import { Input } from "../input";
import { TextArea } from "../textarea";
import { APP_ROLES } from "../../common/roles";
import { statuses } from "../../common/statuses";
import type {
  PatientByStatusRs,
  UserShortInfoDto,
  WishDto,
} from "../../api/model";
import dayjs from "dayjs";

export const WishesForm: React.FC<{
  wish: WishDto;
  patients: PatientByStatusRs[];
  users: UserShortInfoDto[];
  intent: "EDIT" | "CREATE";
}> = (props) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="POST">
      <ScrollRestoration />
      <div>
        <Input
          name="title"
          type="text"
          label="Название"
          defaultValue={props.wish?.title as string}
          placeholder="Введите название..."
          error=""
        />

        <TextArea
          name="description"
          label="Описание"
          defaultValue={props.wish?.description as string}
          placeholder="Введите описание..."
          error=""
        />

        <Input
          name="planExecuteDate"
          type="date"
          label="Плановая дата завершение"
          defaultValue={
            props.wish?.planExecuteDate
              ? dayjs(props.wish.planExecuteDate).format("YYYY-MM-DD")
              : ""
          }
          error=""
        />

        <div>
          <div>Для кого</div>
          <select name="patient" defaultValue={props.wish?.patient?.id}>
            <option value="">Для хосписа</option>
            <option disabled>---------</option>
            {props.patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {[patient.firstName, patient.middleName, patient.lastName]
                  .filter(Boolean)
                  .join(" ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div>Приоритет</div>
          <select name="wishPriority" defaultValue={props.wish?.wishPriority}>
            <option value="RED">RED</option>
            <option value="YELLOW">YELLOW</option>
            <option value="GREEN">GREEN</option>
          </select>
        </div>
      </div>
      <div>
        <div>Исполнители</div>
        <select
          multiple
          style={{ height: "300px" }}
          name="wishExecutors"
          defaultValue={
            props.wish?.wishExecutors?.map((exec) =>
              exec.executor?.id?.toString()
            ) as string[]
          }
        >
          {props.users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {[user.firstName, user.middleName, user.lastName]
                  .filter(Boolean)
                  .join(" ")}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div>Статус</div>
        <select name="status" defaultValue={props.wish?.status}>
          {Object.keys(statuses).map((k) => (
            <option key={k} value={k}>
              {statuses[k as keyof WishDto["status"]]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>Видимость роли</div>
        <select
          name="wishVisibility"
          multiple
          style={{ height: "300px" }}
          defaultValue={props.wish?.wishVisibility?.map((i) => i.toString())}
        >
          {APP_ROLES.map((role) => (
            <option key={role.id} value={role.id}>
              {role.roleName}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        name="intent"
        value={props.intent}
        disabled={props.wish && props.wish.status !== "OPEN"}
      >
        {props.intent === "CREATE" ? "Создать" : "Сохранить"}
      </button>
      <input type="hidden" name="id" value={props.wish?.id} />
    </fetcher.Form>
  );
};
