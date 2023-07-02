import React from "react";
import styles from "./index.module.less";

export const Input: React.FC<{
  type: "text" | "password";
  name: string;
  label: string;
  error: string;
  defaultValue: string;
}> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.input}>
        <input
          type={props.type}
          name={props.name}
          defaultValue={props.defaultValue}
        />
      </div>
      {props.error && <div>{props.error}</div>}
    </div>
  );
};

Input.displayName = "Input";
