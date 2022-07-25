import { format } from "date-fns";
import React, { useRef } from "react";
import { IWish } from "src/model/IWish";
import { useGetUsersQuery } from "src/services/api/usersApi";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import { getRefDate, getRefValue } from "src/utils/GetRef";
import { number, object, string } from "yup";
import { IUserInfo } from "src/services/api/authApi";
import { IPatient, useGetPatientsQuery } from "src/services/api/patientApi";
import Select from "react-select";
import styles from "./FormWishes.module.less";

const wishesSchema = object({
  description: string().required().min(5),
  patientId: number().required().positive(),
  title: string().required().min(3),
});

const FormWishes = ({
  propWish,
  titlePage,
  submit,
  cancelButton,
}: {
  propWish: IWish | null | undefined;
  titlePage: string;
  submit: (formData: IWish) => void;
  cancelButton: () => void;
}) => {
  const creatorUserInfo = useSelector(selectUserInfo);
  const patientRef = useRef(null);
  const executorRef = useRef(null);
  const dateRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();
  const titleRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const { data: users } = useGetUsersQuery();
  const { data: patients } = useGetPatientsQuery();
  let user: IUserInfo | undefined;
  let patient: IPatient | undefined;

  const getUserById = (id: number) =>
    users?.find((u: IUserInfo) => u.id === id);

  const getPatienById = (id: number) =>
    patients?.find((p: IPatient) => p.id === id);

  const submitWishes = async () => {
    const executor = getUserById(
      (executorRef.current as any).getValue()[0]?.value
    );
    const wish: IWish = {
      createDate: Date.now(),
      creatorId: creatorUserInfo.id,
      patientId: (patientRef.current as any).getValue()[0].value,
      description: getRefValue(descriptionRef, ""),
      executorId: executor?.id || 0,
      factExecuteDate: null,
      id: propWish?.id || 0,
      planExecuteDate: getRefDate(dateRef, timeRef),
      status: "IN_PROGRESS",
      title: getRefValue(titleRef, ""),
    };

    if (executor === undefined) {
      delete wish.executorId;
    }

    await wishesSchema
      .validate(wish, { abortEarly: false })
      .then(async () => {
        await submit(wish);
        cancelButton();
      })
      .catch((e: any) => alert(e.errors.join("\n\r")));
  };

  if (propWish && propWish.patientId) {
    patient = getPatienById(propWish.patientId);
  }

  if (propWish && propWish.executorId) {
    user = getUserById(propWish.executorId);
  }

  return (
    <div className={styles.edit_wishes__conatainer}>
      <header className={styles.view_wishes__header}>
        <div className={styles.view_wishes__header_title}>{titlePage}</div>
      </header>
      <div className={styles.wishes_form}>
        <input
          className={styles.wishes_category}
          type="text"
          placeholder="Тема"
          ref={titleRef}
          defaultValue={propWish ? propWish.title : ""}
          minLength={3}
        />
        <div>
          <Select
            isMulti={false}
            name="patients"
            ref={patientRef}
            options={patients?.map((p) => ({
              label: `${p.lastName} ${p.firstName} ${p.middleName}`,
              value: p.id,
            }))}
            defaultValue={
              patient
                ? {
                    label: `${patient.lastName} ${patient.middleName} ${patient.firstName}`,
                    value: patient.id,
                  }
                : { label: "Пациент", value: 0 }
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div className={styles.wishes_row}>
          <Select
            isMulti={false}
            name="users"
            ref={executorRef}
            options={users?.map((userInfo) => ({
              label: `${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`,
              value: userInfo.id,
            }))}
            defaultValue={
              user
                ? {
                    label: `${user.lastName} ${user.middleName} ${user.firstName}`,
                    value: user.id,
                  }
                : { label: "Исполнитель", value: 0 }
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <div className={styles.wishes_date}>
            <input
              type="date"
              ref={dateRef}
              min={format(new Date(), "yyyy-MM-dd")}
              defaultValue={
                propWish
                  ? format(propWish.planExecuteDate, "yyyy-MM-dd")
                  : format(new Date(), "yyyy-MM-dd")
              }
            />
          </div>
          <div className={styles.wishes_time}>
            <input
              type="time"
              ref={timeRef}
              defaultValue={
                propWish
                  ? format(propWish.planExecuteDate, "HH:mm")
                  : format(new Date(), "HH:mm")
              }
            />
          </div>
        </div>
        <textarea
          className={styles.wishes_description}
          placeholder="Описание"
          ref={descriptionRef}
          defaultValue={propWish ? propWish.description : ""}
          minLength={5}
        />
        <div className={styles.wishes_controls}>
          <button
            type="button"
            className={`${styles.wishes_add__button} ${styles.wishes_add__button_save}`}
            onClick={submitWishes}
          >
            СОХРАНИТЬ
          </button>
          <button
            type="button"
            className={styles.wishes_add__button}
            onClick={cancelButton}
          >
            ОТМЕНИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormWishes;
