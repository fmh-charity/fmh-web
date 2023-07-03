import React from "react";
import type { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./index.module.less";
import { Link, type LinkProps } from "react-router-dom";

export const ButtonLink: React.FC<
  PropsWithChildren<
    LinkProps & {
      intent: "primary" | "secondary";
      justify?: "left" | "center" | "right";
    }
  >
> = (props) => {
  console.log(props);
  return (
    <Link {...props} className={classNames(styles.button)}>
      <span
        className={classNames(
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
