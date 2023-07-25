import React from "react";
import type { WishDto } from "../../../api/model";
import type { Row } from "@tanstack/react-table";
import clsx from "clsx";
import styles from "./index.module.less";
import { Icon } from "../../icon";
import { statuses } from "../../../common/statuses";

export const Status: React.FC<{ row: Row<WishDto> }> = ({ row }) => {
  console.log("row", row, row.getValue("status"));
  const status = row.getValue("status") as string;
  const counter =
    row.original.status === "IN_PROGRESS"
      ? 4 //row.original.wishExecutors?.length ?? 0
      : null;
  return status ? (
    <div className={styles.wrapper}>
      <div
        className={clsx(styles.status, styles[row.original.status as string])}
      >
        {statuses[status as keyof WishDto["status"]]}
        {counter && <div className={styles.counter}>{counter}</div>}
      </div>
      <Icon.Help24 color="#f34141" />
    </div>
  ) : null;
};

// {
//   "id": 96,
//   "patient": {
//     "id": 2,
//     "firstName": "Иванов",
//     "middleName": "Иванович",
//     "lastName": "Иван"
//   },
//   "title": "string",
//   "description": "string",
//   "creator": {
//     "id": 1,
//     "firstName": "Иван",
//     "middleName": "Иванович",
//     "lastName": "Иванов"
//   },
//   "executor": null,
//   "createDate": 0,
//   "planExecuteDate": 0,
//   "factExecuteDate": 0,
//   "status": "OPEN",
//   "room": {
//     "id": 1,
//     "name": "string",
//     "nurseStationId": 1,
//     "maxOccupancy": 0,
//     "comment": "string"
//   },
//   "wishVisibility": [
//     1,
//     2
//   ],
//   "wishExecutors": [],
//   "wishPriority": "RED"
// }
