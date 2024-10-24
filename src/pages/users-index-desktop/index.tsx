import type { Table } from "@tanstack/react-table";
import { TableSection } from "../../components/table-section";
import styles from "./index.module.less";
import type { TabType } from "../../components/table-section/tab";
import { ButtonLink } from "../../components/button-link";
import { Icon } from "../../components/icon";

export const UsersIndexDesktop = ({
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
      <TableSection
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        table={table}
        tabs={tabs}
        buttons={
          <>
            <ButtonLink intent="primary" Icon={Icon.Plus16} to="create">
              Добавить пациента
            </ButtonLink>
          </>
        }
      />
    </div>
  );
};
