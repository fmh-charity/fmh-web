import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IClaims } from "src/pages/claims/claimsPage";
import { useGetUsersQuery } from "src/services/api/usersApi";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import { getRefDate, getRefValue } from "src/utils/GetRef";
import { number, object, string } from "yup";
import styles from "./Formclaims.module.less";

const claimSchema = object({
  description: string().required().min(5),
  executorId: number().required().positive(),
  title: string().required().min(3),
});

const FormClaims = ({
  claims,
  titlePage,
  submit,
}: {
  claims: IClaims;
  titlePage: string;
  submit: (formData: IClaims) => void;
}) => {
  const navigation = useNavigate();
  const creatorUserInfo = useSelector(selectUserInfo);
  const executorRef = React.createRef<HTMLSelectElement>();
  const dateRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();
  const titleRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const { data: users } = useGetUsersQuery();

  const getUserById = (id: number) => users?.find((user) => user.id === id);

  const submitClaim = async () => {
    const executor = getUserById(parseInt(getRefValue(executorRef, "0"), 10));
    const claim = {
      createDate: Date.now(),
      creatorId: creatorUserInfo.id,
      creatorName: `${creatorUserInfo.lastName} ${creatorUserInfo.firstName} ${creatorUserInfo.middleName}`,
      description: getRefValue(descriptionRef, ""),
      executorId: executor?.id || 0,
      executorName: `${executor?.lastName} ${executor?.firstName} ${executor?.middleName}`,
      factExecuteDate: null,
      id: claims.id || 0,
      planExecuteDate: getRefDate(dateRef, timeRef),
      status: "IN_PROGRESS",
      title: getRefValue(titleRef, ""),
    };
    await claimSchema
      .validate(claim, { abortEarly: false })
      .then(async () => {
        await submit(claim);
        navigation("/claims");
      })
      .catch((e) => alert(e.errors.join("\n\r")));
  };

  return (
    <div className={styles.edit_claims__conatainer}>
      <header className={styles.edit_claims__header}>
        <div className={styles.edit_claims__header_title}>{titlePage}</div>
      </header>
      <div className={styles.claims_form}>
        <input
          className={styles.claims_category}
          type="text"
          placeholder="Тема"
          ref={titleRef}
          defaultValue={claims ? claims.title : ""}
          minLength={3}
        />
        <div className={styles.claims_row}>
          <select className={styles.claims_category} ref={executorRef}>
            <option>Выберите исполнителя</option>
            {users &&
              users?.map((userInfo) => (
                <option key={userInfo.id} value={userInfo.id}>
                  {`${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`}
                </option>
              ))}
          </select>
          <div className={styles.claims_date}>
            <input
              type="date"
              ref={dateRef}
              min={format(new Date(), "yyyy-MM-dd")}
              defaultValue={
                format(claims.planExecuteDate, "yyyy-MM-dd") ||
                format(new Date(), "yyyy-MM-dd")
              }
            />
          </div>
          <div className={styles.claims_time}>
            <input
              type="time"
              ref={timeRef}
              defaultValue={
                format(claims.planExecuteDate, "HH:mm") ||
                format(new Date(), "HH:mm")
              }
            />
          </div>
        </div>
        <textarea
          className={styles.claims_description}
          placeholder="Описание"
          ref={descriptionRef}
          defaultValue={claims ? claims.description : ""}
          minLength={5}
        />
        <div className={styles.claims_controls}>
          <button
            type="button"
            className={`${styles.claims_add__button} ${styles.claims_add__button_save}`}
            onClick={submitClaim}
          >
            СОХРАНИТЬ
          </button>
          <button
            type="button"
            className={styles.claims_add__button}
            onClick={() => navigation("/claims")}
          >
            ОТМЕНИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormClaims;
