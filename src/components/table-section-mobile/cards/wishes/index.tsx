import type { Row } from "@tanstack/react-table";
import styles from "./index.module.less";
import { StatusWishes } from "./status";
import { Icon } from "../../../icon";
import clsx from "clsx";
import { ExecuteDate } from "./executeDate";

export const CardsWishes = ({ row }: { row: Row<any> }) => {
  return (
    <div key={row.id} className={styles.card}>
      <div className={styles.spaceBetween}>
        <div className={styles.id}>№{row.getValue("id")}</div>
        <div>
          <StatusWishes row={row} />
        </div>
      </div>
      <div>{row.getValue("title")}</div>
      <div className={styles.patient}>
        {row.getValue("patient") === "Хоспис" ? (
          <Icon.Hospital24 width={16} />
        ) : (
          <Icon.Patients24 width={16} />
        )}
        {row.getValue("patient")}
      </div>
      <div className={clsx(styles.spaceBetween, styles.date)}>
        <div>
          <ExecuteDate row={row} />
        </div>
        <div>{row.renderValue("actions")}</div>
      </div>
    </div>
  );
};
