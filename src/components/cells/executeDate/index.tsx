import React from "react";
import type { Row } from "@tanstack/react-table";
import type { WishDto } from "../../../api/model";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import styles from "./index.module.less";
import clsx from "clsx";

dayjs.extend(isSameOrBefore);

export const ExecuteDate: React.FC<{ row: Row<WishDto> }> = ({ row }) => {
  const hourDiff = Math.abs(
    dayjs.utc(row.original.planExecuteDate).diff(dayjs().utc(true), "hour")
  );

  const statusRed = hourDiff < 6;
  const statusOrange = hourDiff < 12;

  const dateDesktop = row.original.planExecuteDate
    ? dayjs.utc(row.original.planExecuteDate).format("YYYY-MM-DD")
    : "";

  const title = "До завершения осталось " + hourDiff + " часов ";

  return (
    <div title={title} className={styles.wrapper}>
      {dateDesktop}
      {(statusRed || statusOrange) && dateDesktop && (
        <div
          className={clsx({
            [styles.circle]: true,
            [styles.red]: statusRed,
            [styles.orange]: statusOrange && !statusRed,
          })}
        />
      )}
    </div>
  );
};
