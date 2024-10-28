import type { Row } from "@tanstack/react-table";
import styles from "./index.module.less";
import { Icon } from "../../../icon";
import clsx from "clsx";
import type { RolesType } from "../../../../common/roles";
import { roleNames } from "../../../../common/roles";

export const CardsUsers = ({ row }: { row: Row<any> }) => {
  return (
    <div key={row.id} className={styles.card}>
      <div className={styles.spaceBetween}>
        <div className={styles.fullName}>{row.getValue("fullName")}</div>
      </div>      
      <div className={styles.user}>
        <Icon.Workers24 width={16} />
        <div>{row.getValue<RolesType[]>("Roles")
          .map(r => roleNames.get(r)).join(", ") 
          || "Роль не установлена"}
        </div>
      </div>
      <div className={clsx(styles.spaceBetween)}>
        <div className={styles.user}>
          <Icon.Notificatons24 width={16} />
          {row.getValue("E-mail")}
        </div>
          <div>{row.renderValue("actions")}</div>
      </div>
    </div>
  );
};
