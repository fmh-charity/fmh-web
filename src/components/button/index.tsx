import React from "react";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./index.module.less";

export const Button: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    intent: "primary" | "secondary";
    justify?: "left" | "center" | "right";
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  }
> = ({ Icon, intent, justify, children, ...props }) => {
  return (
    <button {...props} className={classNames(styles.button)}>
      <span
        className={classNames(
          styles.wrapper,
          styles[intent],
          styles[justify ?? "left"]
        )}
      >
        {Icon ? <Icon /> : null}
        {children}
      </span>
    </button>
  );
};
