import React from "react";
import { ScrollRestoration, useFetcher } from "react-router-dom";
import { Input } from "../input";
import { TextArea } from "../textarea";
import { APP_ROLES } from "../../common/roles";
import type {
  PatientByStatusRs,
  UserShortInfoDto,
  WishDto,
} from "../../api/model";
import dayjs from "dayjs";
import styles from "./index.module.less";
import { ButtonLink } from "../button-link";
import { Button } from "../button";

export const WishesFormCreate: React.FC<{
  wish: WishDto;
  patients: PatientByStatusRs[];
  users: UserShortInfoDto[];
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

        <div className={styles.mb24}>
          <TextArea
            name="description"
            label="Описание"
            defaultValue={props.wish?.description as string}
            placeholder="Введите описание..."
            error=""
          />
        </div>

        <Input
          name="planExecuteDate"
          type="datetime-local"
          label="Плановая дата завершение"
          defaultValue={
            props.wish?.planExecuteDate
              ? dayjs.utc(props.wish.planExecuteDate).format("YYYY-MM-DD HH:MM")
              : ""
          }
          error=""
        />

        <div className={styles.mb24}>
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
      </div>
      <div className={styles.mb24}>
        <div>Видимость роли</div>
        <select
          name="wishVisibility"
          defaultValue={props.wish?.wishVisibility?.map((i) => i.toString())}
        >
          {APP_ROLES.map((role) => (
            <option key={role.id} value={role.id}>
              {role.roleName}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.controls}>
        <ButtonLink intent="secondary" to="/wishes">
          Отменить
        </ButtonLink>
        <Button
          intent="primary"
          type="submit"
          value="CREATE"
          disabled={props.wish && props.wish.status !== "OPEN"}
        >
          Создать
        </Button>
      </div>
      <input type="hidden" name="intent" value="CREATE" />
      <input type="hidden" name="id" value={props.wish?.id} />
    </fetcher.Form>
  );
};
