import React from "react";
import styles from "./index.module.less";

export const TextArea: React.FC<{
  name: string;
  label: string;
  error: string;
  defaultValue: string;
  placeholder?: string;
}> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{props.label}</div>
      <textarea
        className={styles.textarea}
        name={props.name}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
      />
      {props.error && <div>{props.error}</div>}
    </div>
  );
};
