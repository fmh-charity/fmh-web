import React, { FC } from "react";
import Arrow from "src/assets/icons/arrow.svg";
import { format } from "date-fns";
import { IWishes } from "src/pages/wishes/WishesPage";
import { useNavigate } from "react-router-dom";
import { useGetPatientsQuery } from "src/services/api/patientApi";
import { useGetUsersQuery } from "src/services/api/usersApi";
import styles from "./WishesCard.module.less";

const WishesCard: FC<Partial<IWishes>> = ({
  id,
  title,
  planExecuteDate,
  executorId,
  patientId,
}) => {
  const { patient } = useGetPatientsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      patient: data?.find((p) => p.id === patientId),
    }),
  });
  const { executor } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      executor: data?.find((p) => p.id === executorId),
    }),
  });
  const navigate = useNavigate();

  return (
    <section className={styles.wishes_card__container}>
      <div className={styles.wishes_card__head}>
        <span>Тема</span>
        <span title={title}>{title}</span>
      </div>
      <div className={styles.wishes_card__row}>
        <span>Пациент</span>
        <span
          title={`${patient?.lastName} ${patient?.firstName} ${patient?.middleName}`}
        >
          {`${patient?.lastName} ${patient?.firstName} ${patient?.middleName}`}
        </span>
      </div>
      <div className={styles.wishes_card__row}>
        <span>Исполнитель</span>
        <span
          title={`${executor?.lastName} ${executor?.firstName} ${executor?.middleName}`}
        >
          {`${executor?.lastName} ${executor?.firstName} ${executor?.middleName}`}
        </span>
      </div>
      <div className={styles.wishes_card__row}>
        <span>Плановая</span>
        <span>{format(planExecuteDate!, "dd.MM.yyyy")}</span>
      </div>
      <button
        type="button"
        className={styles.wishes_card__button}
        onClick={() => navigate(`/wishes/view/${id}`)}
      >
        <Arrow />
      </button>
    </section>
  );
};

export default WishesCard;
