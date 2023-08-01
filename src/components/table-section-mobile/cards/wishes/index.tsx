import type { Row } from "@tanstack/react-table";
import styles from "./index.module.less";
import { Status } from "../../../cells/wishes/status";
import { Icon } from "../../../icon";
import { ExecuteDate } from "../../../cells/wishes/executeDate";
import clsx from "clsx";

export const CardsWishes = ({ row }: { row: Row<any> }) => {
  return (
    <div key={row.id} className={styles.card}>
      <div className={styles.spaceBetween}>
        <div className={styles.id}>№{row.getValue("id")}</div>
        <div>
          <Status row={row} />
        </div>
      </div>
      <div>{row.getValue("title")}</div>
      <div className={styles.patient}>
        <Icon.Patients24 width={16} /> {row.getValue("patient")}
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
