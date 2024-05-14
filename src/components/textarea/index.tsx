import React, { useState } from "react";
import styles from "./index.module.less";
import { Icon } from "../icon";
import clsx from "clsx";

export const TextArea: React.FC<{
  name: string;
  label: string;
  error: string;
  defaultValue: string;
  placeholder?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const errorStyle = props.error ? styles.error : "";

  const onFocus = () => {
    setIsFocused(false);
    props.onFocus && props.onFocus();
  };

  const onBlur = () => {
    setIsFocused(false);
    props.onBlur && props.onBlur();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{props.label}</div>
      <textarea
        name={props.name}
        defaultValue={props.defaultValue}
        onFocus={onFocus}
        onBlur={onBlur}
        className={clsx(errorStyle, styles.textarea)}
        placeholder={props.placeholder}
      />
      {props.error && !isFocused && (
        <div className={styles["subtitle__error"]}>
          <Icon.Attention16 /> <span>{props.error}</span>
        </div>
      )}
    </div>
  );
};
