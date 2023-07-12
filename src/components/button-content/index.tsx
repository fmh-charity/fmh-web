import React from "react";
import clsx from "clsx";
import styles from "./index.module.less";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const ButtonContent: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    intent: "primary" | "secondary";
    justify?: "left" | "center" | "right";
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  }
> = ({ Icon, intent, justify, children }) => {
  return (
    <span
      className={clsx(
        styles.wrapper,
        styles[intent],
        styles[justify ?? "left"]
      )}
    >
      {Icon ? <Icon /> : null}
      {children}
    </span>
  );
};
