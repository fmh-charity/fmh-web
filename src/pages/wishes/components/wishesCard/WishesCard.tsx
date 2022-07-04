import React, { FC } from "react";
import Arrow from "src/assets/icons/arrow.svg";
import { format, fromUnixTime } from "date-fns";
import { IWishes } from "src/pages/wishes/WishesPage";
import { useNavigate } from "react-router-dom";
import styles from "./WishesCard.module.less";

const WishesCard: FC<Partial<IWishes>> = ({
  id,
  title,
  planExecuteDate,
  executorName,
}) => {
  const navigate = useNavigate();

  return (
    <section className={styles.wishes_card__container}>
      <div className={styles.wishes_card__head}>
        <span>Тема</span>
        <span title={title}>{title}</span>
      </div>
      <div className={styles.wishes_card__row}>
        <span>Исполнитель</span>
        <span title={executorName}>{executorName}</span>
      </div>
      <div className={styles.wishes_card__row}>
        <span>Плановая</span>
        <span>
          {format(fromUnixTime(planExecuteDate as number), "dd.MM.yyyy")}
        </span>
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
