import React from "react";
import type { WishDto } from "../../../../api/model";
import type { Row } from "@tanstack/react-table";
import clsx from "clsx";
import styles from "./index.module.less";
import { Icon } from "../../../icon";
import { wishStatuses } from "../../../../common/statuses";

export const Status: React.FC<{ row: Row<WishDto> }> = ({ row }) => {
  const counter =
    row.original.status === "IN_PROGRESS"
      ? row.original.wishExecutors?.length ?? 0
      : null;
  return row.original.status ? (
    <div className={styles.wrapper}>
      <div
        className={clsx(styles.status, styles[row.original.status as string])}
      >
        {wishStatuses[row.original.status as keyof WishDto["status"]]}
        {counter !== null && <div className={styles.counter}>{counter}</div>}
      </div>
      <Icon.Help24 color="#f34141" />
    </div>
  ) : null;
};
