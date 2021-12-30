import React from "react";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";

import styles from "../statement-head/styles.module.css";
import cn from "classnames";

const StatementHead = (props) => {
  const { personName, dateNotation, date, personNotation } = props;
  return (
    <>
      {props && (
        <div className={styles.body}>
          <div className={styles.inner}>
            <span className={cn(styles.theme, styles.border)}>{personNotation}</span>
            <p className={styles.text}>{personName}</p>
          </div>
          <div className={styles.inner}>
            <span className={styles.theme}>{dateNotation}</span>
            <p className={styles.text}>{date && format(fromUnixTime(date), "dd.mm.yyyy")}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default StatementHead;
