import { flexRender, type Table } from "@tanstack/react-table";
import { Tabs, type TabType } from "../table-section/tab";
import styles from "./index.module.less";
import { Icon } from "../icon";
import { Status } from "../cells/status";
import { ExecuteDate } from "../cells/executeDate";
import clsx from "clsx";

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
            <div className={clsx(styles.spaceBetween, styles.date)}>
              <div>
                <ExecuteDate row={row} date={row.getValue("planExecuteDate")} />
              </div>
              <div>
                {row
                  .getVisibleCells()
                  .filter((cell) => cell.column.id === "actions")
                  .map((cell) => (
                    <div key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};
