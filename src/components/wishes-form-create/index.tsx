import React from "react";
import { ScrollRestoration, useFetcher, useNavigate } from "react-router-dom";
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
import { Button } from "../button";
import { Select } from "../select";

export const WishesFormCreate: React.FC<{
  wish: WishDto;
  patients: PatientByStatusRs[];
  users: UserShortInfoDto[];
}> = (props) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const patientOptions = props.patients.map((patient) => ({
    label: [patient.firstName, patient.middleName, patient.lastName].join(" "),
    value: patient.id,
  }));
  const roleOptions = APP_ROLES.map((role) => ({
    label: role.roleName,
    value: role.id
  }));
  
  return (
    <fetcher.Form className={styles.wishesForm} method="POST">
      <ScrollRestoration />
      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Название*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="text"
            name="title"
            label="Название просьбы"
            placeholder="Введите название..."
            error={""}
            defaultValue={props.wish?.title as string}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Пациент</span>
        </div>
        <div className={styles.right}>
          <Select
            name="patient"
            label="Найти пациента"
            value={props.wish?.patient?.id}
            options={patientOptions}
            error=""
            isSearchable
          >
          </Select>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Описание просьбы*</span>
        </div>
        <div className={styles.right}>
          <TextArea
            name="description"
            label="Описание"
            defaultValue={props.wish?.description as string}
            placeholder="Введите описание..."
            error=""
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>Желаемая дата и время исполнения*</div>
        </div>
        <div className={styles.right}>
          <Input
            name="planExecuteDate"
            type="datetime-local"
            label="Дата и время"
            defaultValue={
              props.wish?.planExecuteDate
                ? dayjs.utc(props.wish.planExecuteDate).format("YYYY-MM-DD HH:MM")
                : ""
            }
            error=""
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Видимость роли</span>
        </div>
        <div className={styles.right}>
          <Select
            name="wishVisibility"
            label="Найти пациента"
            value={props.wish?.wishVisibility?.map((i) => i.toString())}
            options={roleOptions}
            error=""
          >
          </Select>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <Button
          type="button"
          intent="secondary"
          disabled={fetcher.state === "submitting"}
          onClick={() => navigate("/wishes")}
        >
          Отменить
        </Button>
        <Button
          intent="primary"
          type="submit"
          value="CREATE"
          disabled={props.wish && props.wish.status !== "OPEN"}>
          Создать
        </Button>
      </div>
      <input type="hidden" name="intent" value="CREATE" />
      <input type="hidden" name="id" value={props.wish?.id} />
    </fetcher.Form>
  );
};
