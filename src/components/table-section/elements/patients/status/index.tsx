import React from "react";
import type { PatientByStatusRs } from "../../../../../api/model";
import type { Row } from "@tanstack/react-table";
import { patientStatuses } from "../../../../../common/statuses";
import styles from "./index.module.less";
import clsx from "clsx";

export const StatusPatients: React.FC<{ row: Row<PatientByStatusRs> }> = ({
  row,
}) => {
  return row.original.status ? (
    <div
      className={clsx(
        styles.status,
        styles[row.original.status as keyof PatientByStatusRs["status"]]
      )}
    >
      {
        patientStatuses[
          row.original.status as keyof PatientByStatusRs["status"]
        ]
      }
    </div>
  ) : null;
};
