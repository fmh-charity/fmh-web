import React from "react";
import type { Row } from "@tanstack/react-table";
import type { PatientByStatusRs } from "../../../../../api/model";
import styles from "./index.module.less";
import { Icon } from "../../../../icon";

export const DateOut: React.FC<{ row: Row<PatientByStatusRs> }> = ({ row }) => {
  return (
    <div className={styles.wrapper}>
      <Icon.Calendar16 width={16} />
      {row.renderValue("dateOut")}
    </div>
  );
};
