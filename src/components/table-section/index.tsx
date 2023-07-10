import type { PropsWithChildren, ReactNode } from "react";
import { Button } from "../button";
import { Icon } from "../icon";
import { Input } from "../input";
import styles from "./index.module.less";

import type { Table } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Search = () => {
  return (
    <div className={styles.search}>
      <Input type="text" defaultValue="" name="search" label="" error="" />
      <div className={styles.iconButton}>
        <Icon.Search24 />
      </div>
    </div>
  );
};

export const TableSection = ({
  table,
  tabs,
}: PropsWithChildren & {
  table: Table<any>;
  tabs: JSX.Element;
}) => {
  return (
    <div className={styles.tableSection}>
      <div className={styles.searchWrapper}>
        <Search />
        <div />
        <div className={styles.searchButtons}>
          <Button intent="primary">button</Button>
        </div>
      </div>
      <div className={styles.tabs}>{tabs}</div>
      <div className={styles.content}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
