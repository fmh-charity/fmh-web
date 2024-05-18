import type { Table } from "@tanstack/react-table";
import styles from "./index.module.less";
import { ButtonLink } from "../button-link";
import { TableContent } from "../table-section/content";
import MainPageNews from "../../components/main-page-news";

export const MainWishesIndexDesktop = ({ table }: { table: Table<any> }) => {
  return (
    <div className={styles.mainPageWrapper}>
      <MainPageNews />
      <div className={styles.searchWrapper}>
        <p className={styles.title}>Просьбы</p>
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
