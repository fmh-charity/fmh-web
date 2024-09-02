import { Table, Row } from "@tanstack/react-table";
import styles from "./index.module.less";

export const TableSectionMobile = ({
  table,
  Card,
}: {
  table: Table<any>;
  Card: ({ row }: { row: Row<any> }) => JSX.Element;
}) => {
  return (
    <div className={styles.tableSection}>
      <div className={styles.content}>
        {table.getRowModel().rows.map((row) => (
          <Card key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
};
