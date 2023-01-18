import React from "react";
import styles from "./ErrorComponent.module.less";

interface ErrorComponentsProps {
  errorMessages: string[];
  callbackReset: () => void;
}

export const ErrorComponents: React.FC<ErrorComponentsProps> = ({
  errorMessages,
  callbackReset,
}) =>
  errorMessages.length === 0 ? null : (
    <div className={styles.error_component__container}>
      <div className={styles.error_component__text}>
        {errorMessages.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>
      <button type="button" onClick={callbackReset}>
        x
      </button>
    </div>
  );
