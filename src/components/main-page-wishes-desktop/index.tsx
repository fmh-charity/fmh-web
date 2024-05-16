import type { Table } from "@tanstack/react-table";
import { Tabs } from "../table-section/tab";
import { Cell } from "../table-section/cell";
import { CellHeader } from "../table-section/cell";
import styles from "./index.module.less";
import type { TabType } from "../table-section/tab";
import { ButtonLink } from "../button-link";
import { Icon } from "../icon";
import { TableContent } from "../table-section/content";
import MainPageNews from "../../components/main-page-news";

export const MainWishesIndexDesktop = ({
  table,
  tabs,
  globalFilter,
  setGlobalFilter,
}: {
  table: Table<any>;
  tabs: TabType[];
  globalFilter: string;
  setGlobalFilter: (globalFilter: string) => void;
}) => {
  return (
    <div className={styles.mainPageWrapper}>
      <MainPageNews />
      <div className={styles.searchWrapper}>
        <p className={styles.title}>Просьбы</p>
        <div className={styles.buttons}>
          <ButtonLink intent="primary" justify="right" to="show-all">
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
