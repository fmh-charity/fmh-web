import type { Table } from "@tanstack/react-table";
import type { TabType } from "../../components/table-section/tab";
import { TableSectionMobile } from "../../components/table-section-mobile";
import { Icon } from "../../components/icon";
import { ButtonLink } from "../../components/button-link";
import styles from "./index.module.less";
import { CardsWishes } from "../../components/table-section-mobile/cards/wishes";

export const WishesIndexMobile = ({
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
    <div className={styles.wishes}>
      <TableSectionMobile
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        table={table}
        tabs={tabs}
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
