import React, { ReactNode } from "react";
import Arrow from "src/assets/icons/arrow.svg";
import styles from "./Card.module.less";

const Card = ({
  title,
  callback,
  rows,
}: {
  title: { key: string; value: string };
  callback: () => void;
  rows: { key: string; value: string | ReactNode }[];
}) => (
  <section className={styles.card__container}>
    <div className={styles.card__head}>
      <span>{title.key}</span>
      <span title={title.value}>{title.value}</span>
    </div>
    {rows.map((row) => (
      <div key={row.key} className={styles.card__row}>
        <span>{row.key}</span>
        <span>{row.value}</span>
      </div>
    ))}
    <button type="button" className={styles.card__button} onClick={callback}>
      <Arrow />
    </button>
  </section>
);

export default Card;
