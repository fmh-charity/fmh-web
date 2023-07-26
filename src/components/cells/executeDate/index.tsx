import React from "react";
import type { Row } from "@tanstack/react-table";
import type { WishDto } from "../../../api/model";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import styles from "./index.module.less";
import clsx from "clsx";

dayjs.extend(isSameOrBefore);

export const ExecuteDate: React.FC<{ row: Row<WishDto>; date: string }> = ({
  row,
  date,
}) => {
  const status = dayjs(row.original.planExecuteDate).isValid()
    ? dayjs(row.original.planExecuteDate as number)
        .subtract(2, "day")
        .isSameOrBefore()
    : null;

  return (
    <div className={styles.wrapper}>
      {date}
      {status && date && (
        <div className={clsx({ [styles.circle]: true, [styles.red]: true })} />
      )}
    </div>
  );
};
