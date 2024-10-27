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
    ? dayjs.utc(row.original.planExecuteDate).format("DD.MM.YYYY")
    : "";

    const getHourDeclension = (number: number) => {
      number = Math.abs(number) % 100;
      if (number >= 11 && number <= 14) {
        return "часов";
      }
      const lastDigit = number % 10;
      if (lastDigit === 1) {
        return "час";
      }
      if (lastDigit >= 2 && lastDigit <= 4) {
        return "часа";
      }
      return "часов";
    };
    
    const title =
      hourDiff >= 0
        ? `До завершения: ${hourDiff} ${getHourDeclension(hourDiff)}`
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
