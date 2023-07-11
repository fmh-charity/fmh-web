import React from "react";
import type { PropsWithChildren } from "react";
import styles from "./index.module.less";
import { Link, type LinkProps } from "react-router-dom";
import clsx from "clsx";

export const ButtonLink: React.FC<
  PropsWithChildren<
    LinkProps & {
      intent: "primary" | "secondary";
      justify?: "left" | "center" | "right";
    }
  >
> = (props) => {
  return (
    <Link {...props} className={clsx(styles.button)}>
      <span
        className={clsx(
          styles.wrapper,
          styles[props.intent],
          styles[props.justify ?? "left"]
        )}
      >
        {props.children}
      </span>
    </Link>
  );
};
