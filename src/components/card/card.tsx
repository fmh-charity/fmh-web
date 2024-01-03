import React from "react";
import styles from "./card.module.less";
import clsx from "clsx";

interface CardProps {
  title?: string | React.ReactElement
  className?: string
  children?: React.ReactElement
}

export const Card = ({ className, title, children }: CardProps) => {
  return (
  <section className={clsx(className, styles.root)}>
    {title && <div className={styles.titleContainer}>{title}</div>}
    {children}
  </section>
  );
};
