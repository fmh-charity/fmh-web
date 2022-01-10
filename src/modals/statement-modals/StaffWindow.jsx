import React from "react";
import styles from "./styles.module.css";

const StaffWindow = () => {
  return (
    <div className={styles.staff_window}>
      <p className={`${styles.choose_item} ${styles.bordered}`}>Сотрудники АХЧ</p>
      <p className={styles.choose_item}>Руководители АХЧ</p>
    </div>
  );
};

export default StaffWindow;
