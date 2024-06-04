import type { Table } from "@tanstack/react-table";
import styles from "./index.module.less";
import { ButtonLink } from "../../../button-link";
import { TableContent } from "../../../table-section/content";

export const MainWishesIndexDesktop = ({ table }: { table: Table<any> }) => {
  return (
    <div className={styles.mainPageWrapper}>
      <div className={styles.searchWrapper}>
        <p className={styles.h2}>Просьбы</p>
        <div className={styles.buttons}>
          <ButtonLink intent="primary" justify="right" to="../wishes">
            Просмотреть все просьбы
          </ButtonLink>
        </div>
      </div>
      <div className={styles.wishes}>
        <div className={styles.tableSection}>
          <div className={styles.content}>
            <TableContent table={table} />
          </div>
        </div>
      </div>
    </div>
  );
};
