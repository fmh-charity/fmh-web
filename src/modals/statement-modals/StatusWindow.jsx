import React from "react";
import styles from "./styles.module.css";
const StatementStatus = () => {
  return (
    <div className={styles.status_window}>
      <button className={styles.choose_item}>взять в работу</button>
      <button className={styles.choose_item}>отменить</button>
    </div>
  );
};

export default StatementStatus;
