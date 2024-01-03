import React, { useState } from "react";
import styles from "./details.module.less";
import clsx from "clsx";
import { Icon } from "../icon";

interface DetailsProps {
  className?: string
  title: string | React.ReactElement
  description: string | React.ReactElement
}

export const Details = ({ className, title, description }: DetailsProps) => {
  const [open, setOpen] = useState(false);
  return (
  <section className={clsx(className, styles.root)}>
    <summary className={styles.summary}>
      <div className={styles.title}>{title}</div>
      <button className={clsx(styles.toggle, open && styles.opened)} onClick={() => setOpen(state => !state)}><Icon.Right24 /></button>
      </summary>
    {open && description}
  </section>
  );
};
