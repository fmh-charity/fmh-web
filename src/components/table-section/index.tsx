import type { PropsWithChildren } from "react";
import { Icon } from "../icon";
import styles from "./index.module.less";

import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export const TableSection = ({
  table,
  tabs,
  buttons,
  globalFilter,
  setGlobalFilter,
}: PropsWithChildren & {
  table: Table<any>;
  tabs: React.ReactNode;
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
      <div className={styles.tabs}>{tabs}</div>
      <div className={styles.content}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};
