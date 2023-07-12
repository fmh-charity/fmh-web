import React from "react";
import type { PropsWithChildren } from "react";
import styles from "./index.module.less";
import { Link, type LinkProps } from "react-router-dom";
import { ButtonContent } from "../button-content";

export const ButtonLink: React.FC<
  PropsWithChildren<
    LinkProps & {
      intent: "primary" | "secondary";
      justify?: "left" | "center" | "right";
      Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    }
  >
> = ({ Icon, intent, justify, children, ...props }) => {
  return (
    <Link {...props} className={styles.button}>
      <ButtonContent Icon={Icon} justify={justify} intent={intent}>
        {children}
      </ButtonContent>
    </Link>
  );
};
