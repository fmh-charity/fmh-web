import React from "react";
import styles from "./index.module.less";
import { Icon } from "../icon";
import clsx from "clsx";

export const Input: React.FC<{
  type: "text" | "password" | "date" | "datetime-local";
  name: string;
  label: string;
  error: string;
  defaultValue: string;
  hint?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isError, setError] = React.useState(!!props.error);
  const errorStyle = isError ? styles.error : "";
  const hintStyle = isFocused ? styles.hint : "";

  React.useEffect(() => {
    setError(!!props.error);
  }, [props.error]);

  const handleBlur = () => {
    setError(false);
    setIsFocused(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.input}>
        <input
          type={props.type === "password" && showPassword ? "text" : props.type}
          name={props.name}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          className={clsx(errorStyle, hintStyle)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={props.onChange}
        />
        {props.type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword((prevShowPassword) => !prevShowPassword)
            }
            className={styles.showPassword}
          >
            {showPassword ? <Icon.EyeSlash24 /> : <Icon.Eye24 />}
          </button>
        )}
      </div>
      {isError && !isFocused && (
        <div className={styles["subtitle-error"]}>
          <Icon.Attention16 /> <span>{props.error}</span>
        </div>
      )}
      {isFocused && props.hint && (
        <div className={styles["subtitle-hint"]}>{props.hint}</div>
      )}
    </div>
  );
};

Input.displayName = "Input";
