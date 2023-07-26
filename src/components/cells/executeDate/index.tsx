import React from "react";
import type { Row } from "@tanstack/react-table";
import type { WishDto } from "../../../api/model";
import * as dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import styles from "./index.module.less";
import clsx from "clsx";

dayjs.extend(isSameOrBefore);

export const ExecuteDate: React.FC<{ row: Row<WishDto>; date: string }> = ({
  row,
  date,
}) => {
  const status = row.original.planExecuteDate
    ? dayjs
        .unix(row.original.planExecuteDate as number)
        .subtract(2, "day")
        .isSameOrBefore()
    : null;

  return (
    <div className={styles.wrapper}>
      {date}
      {status && (
        <div className={clsx({ [styles.circle]: true, [styles.red]: true })} />
      )}
    </div>
  );
};
