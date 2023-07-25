import React from "react";
import styles from "./index.module.less";
import { Icon } from "../icon";

export const Input: React.FC<{
  type: "text" | "password" | "date";
  name: string;
  label: string;
  error: string;
  defaultValue: string | number;
  placeholder?: string;
}> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.input}>
        <input
          type={props.type === "password" && showPassword ? "text" : props.type}
          name={props.name}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
        />
        {props.type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((c) => !c)}
            className={styles.showPassword}
          >
            {showPassword ? <Icon.EyeSlash24 /> : <Icon.Eye24 />}
          </button>
        )}
      </div>
      {props.error && <div>{props.error}</div>}
    </div>
  );
};

Input.displayName = "Input";
