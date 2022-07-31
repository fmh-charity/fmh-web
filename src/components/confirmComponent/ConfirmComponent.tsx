import React from "react";
import styles from "./ConfirmComponent.module.less";

const ConfirmComponent = ({
  text,
  callbackConfirm,
}: {
  text: string;
  callbackConfirm: (status: boolean) => void;
}) => (
  <div className={styles.confirm_component__container}>
    <div className={styles.confirm_component__div_text}>{text}</div>
    <div className={styles.confirm_component__button_container}>
      <button
        className={styles.confirm_component__button}
        type="button"
        onClick={() => callbackConfirm(true)}
      >
        Да
      </button>
      <button
        className={styles.confirm_component__button}
        type="button"
        onClick={() => callbackConfirm(false)}
      >
        Отмена
      </button>
    </div>
  </div>
);

export default ConfirmComponent;
