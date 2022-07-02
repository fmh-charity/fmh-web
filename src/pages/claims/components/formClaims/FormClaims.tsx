import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "src/common/categories";
import { IClaims } from "src/pages/claims/claimsPage";
import { useGetUsersQuery } from "src/services/api/usersApi";
import styles from "./Formclaims.module.less";

const FormClaims = ({
  claims,
  title,
  submit,
}: {
  claims: IClaims;
  title: string;
  submit: (formData: {
    creatorId: any;
    creatorName: string;
    description: any;
    id: number;
    title: any;
    createDate: number;
  }) => void;
}) => {
  const navigation = useNavigate();
  const categoryRef = React.createRef<HTMLSelectElement>();
  const dateRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();
  const titleRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const { data } = useGetUsersQuery();

  return (
    <div className={styles.add_claims__conatainer}>
      <header className={styles.header_claims}>
        <div className={styles.header_title}>{title}</div>
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
          <select className={styles.claims_category} ref={categoryRef}>
            {data &&
              data?.map((userInfo) => (
                <option
                  key={userInfo.id}
                  value={`${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`}
                  title={`${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`}
                >
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
            onClick={() => console.log(data)}
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
