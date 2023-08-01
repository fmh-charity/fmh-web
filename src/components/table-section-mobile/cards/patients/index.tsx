import type { Row } from "@tanstack/react-table";
import styles from "./index.module.less";
import { Icon } from "../../../icon";
import clsx from "clsx";
import { StatusPatients } from "./status";
import { DateOut } from "./dateOut";

export const CardsPatients = ({ row }: { row: Row<any> }) => {
  return (
    <div key={row.id} className={styles.card}>
      <div className={styles.spaceBetween}>
        <div className={styles.fullName}>{row.getValue("fullName")}</div>
        <div>
          <StatusPatients row={row} />
        </div>
      </div>
      <div className={styles.patient}>
        <Icon.Bed24 width={16} /> {row.getValue("room")}
      </div>
      <div className={clsx(styles.spaceBetween, styles.date)}>
        <div>
          <DateOut row={row} />
        </div>
        <div>{row.renderValue("actions")}</div>
      </div>
    </div>
  );
};
