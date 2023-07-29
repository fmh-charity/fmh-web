import { Icon } from "../icon";
import styles from "./index.module.less";

import type { Table } from "@tanstack/react-table";
import { Cell, CellHeader } from "./cell";
import type { TabType } from "./tab";
import { Tabs } from "./tab";

export const TableSection = ({
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
        <div />
        <div className={styles.buttons}>{buttons}</div>
      </div>
      <Tabs tabs={tabs} />
      <div className={styles.content}>
        <table>
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
        </table>
      </div>
    </div>
  );
};
