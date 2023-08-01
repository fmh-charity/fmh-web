import React from "react";
import type { Row, Table } from "@tanstack/react-table";
import { Tabs, type TabType } from "../table-section/tab";
import styles from "./index.module.less";
import { Icon } from "../icon";

export const TableSectionMobile = ({
  table,
  tabs,
  buttons,
  globalFilter,
  setGlobalFilter,
  Card,
}: {
  table: Table<any>;
  tabs: TabType[];
  buttons: React.ReactNode;
  globalFilter: string;
  setGlobalFilter: (globalFilter: string) => void;
  Card: ({ row }: { row: Row<any> }) => JSX.Element;
}) => {
  return (
    <div className={styles.tableSection}>
      <div className={styles.searchWrapper}>
        <div className={styles.search}>
          <input
            type="text"
            value={globalFilter}
            name="globalFilter"
            placeholder="Поиск"
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <div className={styles.iconButton}>
            <Icon.Search24 />
          </div>
        </div>
        <div className={styles.buttons}>{buttons}</div>
      </div>
      <Tabs tabs={tabs} />
      <div className={styles.content}>
        {table.getRowModel().rows.map((row) => (
          <Card key={row.id} row={row} />
        ))}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};
