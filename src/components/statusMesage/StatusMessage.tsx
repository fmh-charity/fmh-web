import React from "react";
import styles from "./StatusMessage.module.less";

interface StatusMessageProps {
  statusMessages: string[];
  callbackReset: () => void;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  statusMessages,
  callbackReset,
}) =>
  statusMessages.length === 0 ? null : (
    <div className={styles.status_component__container_info}>
      <div className={styles.status_component__text}>
        {statusMessages.map((status) => (
          <p key={status}>{status}</p>
        ))}
      </div>
      <button type="button" onClick={callbackReset}>
        x
      </button>
    </div>
  );
