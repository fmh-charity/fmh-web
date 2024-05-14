import * as React from "react";
import type { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./index.module.less";
import {
  flexRender,
  type Header,
  type Cell as CellTable,
} from "@tanstack/react-table";
import { Icon } from "../../icon";

export const Cell: React.FC<
  PropsWithChildren & { cell: CellTable<any, unknown> }
> = ({ cell }) => {
  return (
    <td style={{ width: cell.column.getSize() }}>
      <div className={styles.cell}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    </td>
  );
};

export const CellHeader: React.FC<
  PropsWithChildren & { header: Header<any, unknown> }
> = ({ header }) => {
  return (
    <th>
      {header.isPlaceholder ? null : (
        <div className={clsx(styles.cell, styles.header)}>
          <div className={styles.content}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
          {header.column.getCanSort() ? (
            <button
              type="button"
              className={styles.sort}
              onClick={(e) => header.column.getToggleSortingHandler()?.(e)}
            >
              {
                {
                  false: <Icon.Sorter16 style={{ color: "#bababa" }} />,
                  asc: <Icon.Sorter16 style={{ transform: "scaleY(-1)" }} />,
                  desc: <Icon.Sorter16 />,
                }[header.column.getIsSorted() as string]
              }
            </button>
          ) : null}
        </div>
      )}
    </th>
  );
};
