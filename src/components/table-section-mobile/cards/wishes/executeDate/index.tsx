import React from "react";
import type { Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import type { WishDto } from "../../../../../api/model";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import styles from "./index.module.less";
import clsx from "clsx";
import { numberBetween } from "../../../../../common/utils";
import { Icon } from "../../../../icon";

dayjs.extend(isSameOrBefore);

export const ExecuteDate: React.FC<{ row: Row<WishDto> }> = ({ row }) => {
  const hourDiff = dayjs
    .utc(row.original.planExecuteDate)
    .diff(dayjs().utc(true), "hour");

  const dateDesktop = row.original.planExecuteDate
    ? dayjs.utc(row.original.planExecuteDate).format("DD.MM.YYYY")
    : "";

  const timeDesktop = row.original.planExecuteDate
    ? dayjs.utc(row.original.planExecuteDate).format("HH:MM")
    : "";

  const title =
    hourDiff >= 0
      ? "До завершения осталось " + hourDiff + " часов "
      : "Просрочено";

  return (
    dateDesktop &&
    timeDesktop && (
      <div
        title={title}
        className={clsx({
          [styles.wrapper]: true,
          [styles.red]: numberBetween(hourDiff, 0, 6) || hourDiff <= 0,
          [styles.orange]: numberBetween(hourDiff, 7, 12),
        })}
      >
        <Icon.Calendar16 />
        {dateDesktop}
        {` / ${timeDesktop}`}
      </div>
    )
  );
};
