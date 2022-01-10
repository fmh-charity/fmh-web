import React from "react";
import styles from "./styles.module.css";
const StatementStatus = () => {
  return (
    <div className={styles.status_window}>
      <p className={`${styles.choose_item} ${styles.bordered}`}>взять в работу</p>
      <p className={styles.choose_item}>изменить</p>
    </div>
  );
};

export default StatementStatus;
