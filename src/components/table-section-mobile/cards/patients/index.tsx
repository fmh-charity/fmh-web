import type { Row } from "@tanstack/react-table";
import styles from "./index.module.less";
import { Status } from "../../../cells/wishes/status";
import { Icon } from "../../../icon";
import { ExecuteDate } from "../../../cells/wishes/executeDate";
import clsx from "clsx";

export const CardsPatients = ({ row }: { row: Row<any> }) => {
  return (
    <div key={row.id} className={styles.card}>
      <div className={styles.spaceBetween}>
        <div className={styles.fullName}>{row.getValue("fullName")}</div>
        <div>{row.getValue("status")}</div>
      </div>
      <div className={styles.patient}>
        <Icon.Bed24 width={16} /> {row.getValue("room")}
      </div>
      <div className={clsx(styles.spaceBetween, styles.date)}>
        <div>{row.getValue("dateOut")}</div>
        <div>{row.renderValue("actions")}</div>
      </div>
    </div>
  );
};
