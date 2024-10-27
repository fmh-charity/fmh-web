import type { FormEventHandler} from "react";
import React, { useEffect, useState } from "react";
import { ScrollRestoration, useActionData, useFetcher, useNavigate, useSubmit } from "react-router-dom";
import { Input } from "../input";
import type {
  PatientDto,
} from "../../api/model";
import dayjs from "dayjs";
import styles from "./index.module.less";
import { Button } from "../button";
import { useOpenModal } from "../../hooks/useOpenModal";
import { patientStatuses } from "../../common/statuses";
import { CreatePatientSuccessful } from "../../modals/create-patient-successful/create-patient-successful";

interface IFormErrors {
  firstName: string;
  lastName: string;
  middleName: string;

  room?: string;
  dateIn?: string;
  dateOut?: string;
  birthDate?: string;
}

export const PatientsFormCreate: React.FC<{
  patient: PatientDto;
  intent: "CREATE" | "EDIT"
}> = (props) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const openModal = useOpenModal();
  const submit = useSubmit();

  const actionData = useActionData() as { result?: any, errors?: any };

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
      openModal(CreatePatientSuccessful, {});
    }
  }, [actionData, openModal]);

  const resetErrors = () => {
    setFormErrors(undefined);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errors = {
      firstName: "",
      lastName: "",
      middleName: "",
    
      room: "",
      dateIn: "",
      dateOut: "",
      birthDate: "",
    };
    
    for (const [name,value] of data) {
      if (name === "firstName" && !value) errors.firstName = "Заполните поле";
      if (name === "lastName" && !value) errors.lastName = "Заполните поле";
      if (name === "middleName" && !value) errors.middleName = "Заполните поле";
      if (name === "dateIn" && !value) errors.dateIn = "Заполните поле";
      if (name === "birthDate" && !value) errors.birthDate = "Заполните поле";
    }
    setFormErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    submit(e.currentTarget);
  };

  return (
    <fetcher.Form className={styles.patientForm} onSubmit={onSubmit} method="POST">
      <ScrollRestoration />

      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Имя пациента*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="text"
            name="firstName"
            label="Имя пациента"
            placeholder="Имя пациента"
            error={formErrors?.firstName || ""}
            defaultValue={props.patient?.firstName || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Фамилия пациента*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="text"
            name="lastName"
            label="Фамилия пациента"
            placeholder="Фамилия пациента"
            error={formErrors?.lastName || ""}
            defaultValue={props.patient?.lastName || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Отчество пациента*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="text"
            name="middleName"
            label="Отчество пациента"
            placeholder="Отчество пациента"
            error={formErrors?.middleName || ""}
            defaultValue={props.patient?.middleName || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>Дата рождения*</div>
        </div>
        <div className={styles.right}>
          <Input
            name="birthDate"
            type="date"
            max="9999-12-31"
            label="Дата"
            defaultValue={
              props.patient?.birthDate
                ? dayjs.utc(props.patient?.birthDate).format("DD.MM.YYYY")
                : ""
            }
            error={formErrors?.birthDate || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>
      
      {/* 
      TODO: доделать, когда будут готовы палаты
      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Палата</span>
        </div>
        <div className={styles.right}>
          <Input
            type="text"
            name="room"
            label="Палата"
            placeholder="Название палаты"
            error=""
            defaultValue={props.patient.room || ""}
            onFocus={resetErrors}
          />
        </div>
      </div> */}


      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>Дата поступления*</div>
        </div>
        <div className={styles.right}>
          <Input
            name="dateIn"
            type="date"
            max="9999-12-31"
            label="Дата"
            defaultValue={
              props.patient?.dateIn
                ? dayjs.utc(props.patient?.dateIn).format("DD.MM.YYYY")
                : ""
            }
            error={formErrors?.dateIn || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>


      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>Дата выписки</div>
        </div>
        <div className={styles.right}>
          <Input
            name="dateOut"
            type="date"
            max="9999-12-31"
            label="Дата"
            defaultValue={
              props.patient?.dateOut
                ? dayjs.utc(props.patient?.dateOut).format("DD.MM.YYYY")
                : ""
            }
            error={formErrors?.dateOut || ""}
            onFocus={resetErrors}
            min={`${dayjs().format("DD.MM.YYYY HH:MM")}`}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>Статус</div>
        </div>
        <div className={styles.right}>
          <select name="status" defaultValue={props.patient?.status} className={styles.status}>
            {Object.keys(patientStatuses).map((k) => (
              <option key={k} value={k}>
                {patientStatuses[k as keyof PatientDto["status"]]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <Button
          type="button"
          intent="secondary"
          disabled={fetcher.state === "submitting"}
          onClick={() => navigate("/patients")}
        >
          Отменить
        </Button>
        <Button
          intent="primary"
          type="submit">
          Сохранить
        </Button>
      </div>
      <input type="hidden" name="intent" value={props.intent} />
      <input type="hidden" name="id" value={props.patient?.id} />
    </fetcher.Form>
  );
};
