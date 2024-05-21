import type { Row, Table } from "@tanstack/react-table";
import { Tabs, type TabType } from "../../components/table-section/tab";
import { Icon } from "../../components/icon";
import { ButtonLink } from "../../components/button-link";
import styles from "./index.module.less";
import { CardsWishes } from "../../components/table-section-mobile/cards/wishes";
import MainPageNews from "../main-page-news";

const TableSectionMobile = ({
  table,
//  tabs,
  buttons,
  // globalFilter,
  // setGlobalFilter,
  Card,
}: {
  table: Table<any>;
//</any>  tabs: TabType[];
  buttons: React.ReactNode;
  // globalFilter: string;
  // setGlobalFilter: (globalFilter: string) => void;
  Card: ({ row }: { row: Row<any> }) => JSX.Element;
}) => {
  return (
    <div className={styles.tableSection}>
      <div className={styles.searchWrapper}>
        <div className={styles.search}>
          {/* <input
            type="text"
            // value={globalFilter}
            // name="globalFilter"
            // placeholder="Поиск"
            // onChange={(e) => setGlobalFilter(e.target.value)}
          /> */}
          {/* <div className={styles.iconButton}>
            <Icon.Search24 />
          </div> */}
        </div>
        {/* <div className={styles.buttons}>{buttons}</div> */}
      </div>
      {/* <Tabs tabs={tabs} /> */}
      <div className={styles.content}>
        {table.getRowModel().rows.map((row) => (
          <Card key={row.id} row={row} />
        ))}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export const MainWishesIndexMobile = ({
  table,
//  tabs,
  // globalFilter,
  // setGlobalFilter,
}: {
  table: Table<any>;
//  tabs: TabType[];
  // globalFilter: string;
  // setGlobalFilter: (globalFilter: string) => void;
}) => {
  return (
    <div className={styles.wishes}>
      <MainPageNews />
      <p className={styles.title}>Просьбы</p>
      <TableSectionMobile
        // globalFilter={globalFilter}
        // setGlobalFilter={setGlobalFilter}
        table={table}
//        tabs={tabs}
        Card={CardsWishes}
        buttons={
          <>
            <Icon.Filter24 />
            <ButtonLink intent="primary" Icon={Icon.Plus16} to="create" />
          </>
        }
      />
    </div>
  );
};
