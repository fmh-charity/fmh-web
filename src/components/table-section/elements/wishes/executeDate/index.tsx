import React from "react";
import type { Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import type { WishDto } from "../../../../../api/model";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import styles from "./index.module.less";
import clsx from "clsx";
import { numberBetween } from "../../../../../common/utils";

dayjs.extend(isSameOrBefore);

export const ExecuteDate: React.FC<{ row: Row<WishDto> }> = ({ row }) => {
  const hourDiff = dayjs
    .utc(row.original.planExecuteDate)
    .diff(dayjs().utc(true), "hour");

  const dateDesktop = row.original.planExecuteDate
    ? dayjs.utc(row.original.planExecuteDate).format("YYYY-MM-DD")
    : "";

  const title =
    hourDiff >= 0
      ? "До завершения осталось " + hourDiff + " часов "
      : "Просрочено";

  return (
    <div title={title} className={styles.wrapper}>
      {dateDesktop}
      {dateDesktop && (
        <div
          className={clsx({
            [styles.circle]: true,
            [styles.red]: numberBetween(hourDiff, 0, 6) || hourDiff <= 0,
            [styles.orange]: numberBetween(hourDiff, 7, 12),
          })}
        />
      )}
    </div>
  );
};
