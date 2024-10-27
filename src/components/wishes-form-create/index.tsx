import React, { useEffect, useState } from "react";
import { Form, ScrollRestoration, useActionData, useFetcher, useNavigate } from "react-router-dom";
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
import clsx from "clsx";
import { useOpenModal } from "../../hooks/useOpenModal";
import { CreateWishSuccessful } from "../../modals/create-wish-successful/create-wish-successful";

interface IFormErrors {
  title?: string;
  description?: string;
  planExecuteDate?: string;
}

export const WishesFormCreate: React.FC<{
  wish: WishDto;
  patients: PatientByStatusRs[];
  users: UserShortInfoDto[];
}> = (props) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const openModal = useOpenModal();

  const actionData = useActionData() as { result?: any, errors?: any };
  const patientOptions = props.patients.map((patient) => ({
    label: [patient.firstName, patient.middleName, patient.lastName].join(" "),
    value: patient.id,
  }));
  const roleOptions = APP_ROLES.map((role) => ({
    label: role.roleName,
    value: role.id
  }));

  const [ formErrors, setFormErrors ] = useState<IFormErrors>();
  const [ isInputFocused, setIsInputFocused ] = useState(false);

  useEffect(() => {
    if (actionData?.errors) {
      setFormErrors(actionData?.errors);
    }
  }, [actionData]);

  useEffect(() => {
    if (isInputFocused) {
      setFormErrors(undefined);
      setIsInputFocused(true);
    }
  }, [isInputFocused]);

  useEffect(() => {
    if (actionData?.result === "ok") {
      openModal(CreateWishSuccessful, {});
    }
  }, [actionData, openModal]);

  const resetErrors = () => {
    setFormErrors(undefined);
  };

  return (
    <Form className={styles.wishesForm} method="POST">
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
            placeholder="Краткое название"
            error={formErrors?.title || ""}
            defaultValue={props.wish?.title as string}
            onFocus={resetErrors}
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
            placeholder="ФИО пациента"
            error=""
            isSearchable
          >
          </Select>
        </div>
      </div>
      <div className={clsx(styles.row, styles.withMargin)}>
        <div className={styles.left}>
          <span className={styles.title}>Описание просьбы*</span>
        </div>
        <div className={styles.right}>
          <TextArea
            name="description"
            label="Описание"
            defaultValue={props.wish?.description as string}
            placeholder="Опишите подробно, что необходимо сделать"
            error={formErrors?.description || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>Желаемые дата и время исполнения*</div>
        </div>
        <div className={styles.right}>
          <Input
            name="planExecuteDate"
            type="datetime-local"
            max="9999-12-31"
            label="Дата и время"
            defaultValue={
              props.wish?.planExecuteDate
                ? dayjs.utc(props.wish.planExecuteDate).format("DD.MM.YYYY HH:MM")
                : ""
            }
            error={formErrors?.planExecuteDate || ""}
            onFocus={resetErrors}
            min={`${dayjs().format("DD.MM.YYYY HH:MM")}`}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Видимость просьбы</span>
        </div>
        <div className={styles.right}>
          <Select
            name="wishVisibility"
            label="Выбрать роль"
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
          Сохранить
        </Button>
      </div>
      <input type="hidden" name="intent" value="CREATE" />
      <input type="hidden" name="id" value={props.wish?.id} />
    </Form>
  );
};
