import React from "react";
import styles from "./ViewClaims.module.less";

const ViewClaims = () => {
  return (
    <div className={styles.add_claims__container}>
      <div className={styles.add_claims__wrapper}>
        <div className={styles.add_claims__header}>
          <span>Тема</span>
          <span>Тут будет тема</span>
        </div>
        <div className={styles.add_claims__row}>
          <span>Исполнитель</span>
          <span>Исполнитель</span>
        </div>
        <div className={styles.add_claims__row}>
          <span>Плановая дата</span>
          <span>Плановая дата</span>
        </div>
        <div className={styles.add_claims__row}>
          <span>Тема</span>
          <span>Тут будет тема</span>
        </div>
        <div className={styles.add_claims__row}>
          <span>Тема</span>
          <span>Тут будет тема</span>
        </div>
        <div className={styles.add_claims__row}>
          <span>Тема</span>
          <span>Тут будет тема</span>
        </div>
        <div className={styles.add_claims__row}>
          <span>Тема</span>
          <span>Тут будет тема</span>
        </div>
      </div>
    </div>
  );
};

export default ViewClaims;
