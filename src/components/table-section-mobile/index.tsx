import type { CellContext, Row } from "@tanstack/react-table";
import { flexRender, type Table } from "@tanstack/react-table";
import { Tabs, type TabType } from "../table-section/tab";
import styles from "./index.module.less";
import { Icon } from "../icon";
import type { ReactNode } from "react";
import { Status } from "../cells/status";
import { ExecuteDate } from "../cells/executeDate";

export const TableSectionMobile = ({
  table,
  tabs,
  buttons,
  globalFilter,
  setGlobalFilter,
}: {
  table: Table<any>;
  tabs: TabType[];
  buttons: React.ReactNode;
  globalFilter: string;
  setGlobalFilter: (globalFilter: string) => void;
}) => {
  const visibleColumns = table.getVisibleFlatColumns();
  console.log(visibleColumns);
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
            <div className={styles.spaceBetween}>
              <div>
                <ExecuteDate row={row} date={row.getValue("planExecuteDate")} />
              </div>
              <div>
                {row
                  .getVisibleCells()
                  .filter((cell) => cell.column.id === "actions")
                  .map((cell) =>
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
              </div>
            </div>

            {/* {row.getVisibleCells().map((cell) => (
              <div key={cell.id}>
                {cell.column.id}
                <pre>{JSON.stringify(cell.getContext(), null, 2)} </pre>
                {cell.getValue() as ReactNode}
              </div>
            ))} */}
          </div>
        ))}
        {/* <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <CellHeader key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Cell key={cell.id} cell={cell} />
                ))}
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};
