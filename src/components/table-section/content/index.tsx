import styles from "../index.module.less";
import type { Table } from "@tanstack/react-table";
import { Cell, CellHeader } from "../cell";

type Props = {
  table: Table<any>;
};

export const TableContent = ({ table }: Props) => {
  return (
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
  );
};
