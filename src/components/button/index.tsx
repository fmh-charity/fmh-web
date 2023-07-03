import React from "react";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./index.module.less";

export const Button: React.FC<
  PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      intent: "primary" | "secondary";
      justify?: "left" | "center" | "right";
    }
  >
> = (props) => {
  return (
    <button {...props} className={classNames(styles.button)}>
      <span
        className={classNames(
          styles.wrapper,
          styles[props.intent],
          styles[props.justify ?? "left"]
        )}
      >
        {props.children}
      </span>
    </button>
  );
};
