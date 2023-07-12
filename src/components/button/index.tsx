import React from "react";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./index.module.less";
import { ButtonContent } from "../button-content";

export const Button: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    intent: "primary" | "secondary";
    justify?: "left" | "center" | "right";
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  }
> = ({ Icon, intent, justify, children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      <ButtonContent Icon={Icon} justify={justify} intent={intent}>
        {children}
      </ButtonContent>
    </button>
  );
};
