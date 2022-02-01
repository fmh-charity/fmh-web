import React from "react";
import { getlc } from "../../local-store-service";
import styles from "./styles.module.css";

const StatementStatus = ({ claim, changeStatus }) => {
  const user = JSON.parse(getlc("user") || {});

  const handleChangeOpen = () => {
    changeStatus({ ...claim, status: "OPEN", executorName: "" });
  };

  const handleChangeExecuted = () => {
    changeStatus({ ...claim, status: "EXCETUTED" });
  };

  const handleChangeInProgress = () => {
    changeStatus({
      ...claim,
      executorId: user.id,
      executorName: `${user.lastName} ${user.firstName} ${user.middleName}`,
      status: "IN_PROGRESS",
    });
  };

  const handleChangeCanceled = () => {
    changeStatus({ ...claim, status: "CANCELED" });
  };

  return (
    <div className={styles.status_window}>
      {claim.executorName ? (
        <>
          <button onClick={handleChangeOpen} className={styles.choose_item}>
            Сбросить
          </button>
          <button onClick={handleChangeExecuted} className={styles.choose_item}>
            Исполнить
          </button>
        </>
      ) : (
        <>
          <button onClick={handleChangeInProgress} className={styles.choose_item}>
            В работу
          </button>
          <button onClick={handleChangeCanceled} className={styles.choose_item}>
            Отменить
          </button>
        </>
      )}
    </div>
  );
};

export default StatementStatus;
