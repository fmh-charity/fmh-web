import type { Table } from "@tanstack/react-table";
import styles from "./index.module.less";
import { CardsWishes } from "../../../table-section-mobile/cards/wishes";
import { TableSectionMobile } from "./table-section/table-section";
import { ButtonLink } from "../../../button-link";

export const MainWishesIndexMobile = ({ table }: { table: Table<any> }) => {
  return (
    <div className={styles.wishes}>
      <p className={styles.h2}>Просьбы</p>
      <TableSectionMobile table={table} Card={CardsWishes} />
      <div className={styles.buttons}>
        <ButtonLink intent="primary" justify="center" to="../wishes">
          Просмотреть все просьбы
        </ButtonLink>
      </div>
    </div>
  );
};
