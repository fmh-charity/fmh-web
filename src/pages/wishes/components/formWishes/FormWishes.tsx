import { format } from "date-fns";
import React, { useState } from "react";
import { IWishes } from "src/pages/wishes/wishesPage";
import { useGetUsersQuery } from "src/services/api/usersApi";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import { getRefDate, getRefValue } from "src/utils/GetRef";
import { number, object, string } from "yup";
import { UserInfo } from "src/services/api/authApi";
import { useGetPatientsQuery } from "src/services/api/patientApi";
import styles from "./FormWishes.module.less";

const wishesSchema = object({
  description: string().required().min(5),
  executorId: number().required().positive(),
  title: string().required().min(3),
});

const FormWishes = ({
  wishes,
  titlePage,
  submit,
  cancelButton,
}: {
  wishes: IWishes;
  titlePage: string;
  submit: (formData: IWishes) => void;
  cancelButton: () => void;
}) => {
  const creatorUserInfo = useSelector(selectUserInfo);
  const patientRef = React.createRef<HTMLSelectElement>();
  const executorRef = React.createRef<HTMLSelectElement>();
  const dateRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();
  const titleRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const { data: users } = useGetUsersQuery();
  const { data: patients } = useGetPatientsQuery();

  const getUserById = (id: number) =>
    users?.find((user: UserInfo) => user.id === id);

  const submitClaim = async () => {
    const executor = getUserById(parseInt(getRefValue(executorRef, "0"), 10));
    const wish = {
      createDate: Date.now(),
      creatorId: creatorUserInfo.id,
      patientId: getRefValue(patientRef, 0),
      description: getRefValue(descriptionRef, ""),
      executorId: executor?.id || 0,
      executorName: `${executor?.lastName} ${executor?.firstName} ${executor?.middleName}`,
      factExecuteDate: null,
      id: wishes.id || 0,
      planExecuteDate: getRefDate(dateRef, timeRef),
      status: "IN_PROGRESS",
      title: getRefValue(titleRef, ""),
    };
    await wishesSchema
      .validate(wish, { abortEarly: false })
      .then(async () => {
        await submit(wish);
        cancelButton();
      })
      .catch((e: any) => alert(e.errors.join("\n\r")));
  };

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
          defaultValue={wishes ? wishes.title : ""}
          minLength={3}
        />
        <select className={styles.wishes_category} ref={patientRef}>
          <option>Выберите пациента</option>
          {patients &&
            patients?.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {`${patient.lastName} ${patient.firstName} ${patient.middleName}`}
              </option>
            ))}
        </select>
        <div className={styles.wishes_row}>
          <select className={styles.wishes_category} ref={executorRef}>
            <option>Выберите исполнителя</option>
            {users &&
              users?.map((userInfo) => (
                <option key={userInfo.id} value={userInfo.id}>
                  {`${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`}
                </option>
              ))}
          </select>
          <div className={styles.wishes_date}>
            <input
              type="date"
              ref={dateRef}
              min={format(new Date(), "yyyy-MM-dd")}
              defaultValue={
                format(wishes.planExecuteDate, "yyyy-MM-dd") ||
                format(new Date(), "yyyy-MM-dd")
              }
            />
          </div>
          <div className={styles.wishes_time}>
            <input
              type="time"
              ref={timeRef}
              defaultValue={
                format(wishes.planExecuteDate, "HH:mm") ||
                format(new Date(), "HH:mm")
              }
            />
          </div>
        </div>
        <textarea
          className={styles.wishes_description}
          placeholder="Описание"
          ref={descriptionRef}
          defaultValue={wishes ? wishes.description : ""}
          minLength={5}
        />
        <div className={styles.wishes_controls}>
          <button
            type="button"
            className={`${styles.wishes_add__button} ${styles.wishes_add__button_save}`}
            onClick={submitClaim}
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
