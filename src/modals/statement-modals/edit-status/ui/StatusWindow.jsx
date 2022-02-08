import React from "react";
import { getlc } from "../../../../local-store-service";
import styles from "../../styles.module.css";
import useEditCommentRepository from "../../../../statementPage/statement-comment-form/repository";
import useRepository from "../repository";

const StatementStatus = ({ claim, editStatus }) => {
  const user = JSON.parse(getlc("user") || {});

  const [{ openEdit }, editCommentMethods] = useEditCommentRepository();
  const [repo, methods] = useRepository();

  const handleReset = async () => {
    await editCommentMethods.openCommentModal();

    editStatus({ status: "OPEN", executorName: "" }, claim.id);
  };

  const handleExecute = () => {
    editStatus({ status: "EXECUTED" });
  };

  const handleCancel = () => {
    editStatus({ status: "EXECUTED" });
  };

  const handleWork = () => {
    editStatus(
      {
        executorId: user.id,
        id: claim.id,
        status: "IN_PROGRESS",
      },
      claim.id,
    );
  };

  return (
    <div className={styles.status_window}>
      {claim.executorName ? (
        <>
          <button onClick={handleReset} className={styles.choose_item}>
            Сбросить
          </button>
          <button onClick={handleExecute} className={styles.choose_item}>
            Исполнить
          </button>
        </>
      ) : (
        <>
          <button onClick={handleWork} className={styles.choose_item}>
            В работу
          </button>
          <button onClick={handleCancel} className={styles.choose_item}>
            Отменить
          </button>
        </>
      )}
    </div>
  );
};

export default StatementStatus;
