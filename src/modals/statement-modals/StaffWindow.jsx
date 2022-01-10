import React from "react";
import styles from "./styles.module.css";

const StaffWindow = () => {
  return (
    <div className={styles.staff_window}>
      <button className={styles.choose_item}>Сотрудники АХЧ</button>
      <button className={styles.choose_item}>Руководители АХЧ</button>
    </div>
  );
};

export default StaffWindow;
