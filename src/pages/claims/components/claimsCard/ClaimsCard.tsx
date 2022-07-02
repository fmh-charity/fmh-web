import React, { FC } from "react";
import Arrow from "src/assets/icons/arrow.svg";
import { format, fromUnixTime } from "date-fns";
import { IClaims } from "src/pages/claims/ClaimsPage";
import styles from "./ClaimsCard.module.less";

const ClaimsCard: FC<Partial<IClaims>> = ({
  title,
  planExecuteDate,
  executorName,
}) => {
  return (
    <section className={styles.claims_card__container}>
      <div className={styles.claims_card__head}>
        <span>Тема</span>
        <span title={title}>{title}</span>
      </div>
      <div className={styles.claims_card__row}>
        <span>Исполнитель</span>
        <span title={executorName}>{executorName}</span>
      </div>
      <div className={styles.claims_card__row}>
        <span>Плановая</span>
        <span>
          {format(fromUnixTime(planExecuteDate as number), "dd.MM.yyyy")}
        </span>
      </div>
      <button
        type="button"
        className={styles.claims_card__button}
        onClick={() => console.log({ planExecuteDate })}
      >
        <Arrow />
      </button>
    </section>
  );
};

export default ClaimsCard;
