import React, { ReactNode } from "react";
import styles from "./Button.module.less";

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode | string;
  onClick: () => any;
}) => (
  <button type="button" onClick={onClick} className={styles.button}>
    {children}
  </button>
);

export default Button;
