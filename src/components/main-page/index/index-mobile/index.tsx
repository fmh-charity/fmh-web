import MainPageNews from "../../news";
import { MainWishesIndexMobile } from "../../wishes/wishes-mobile";
import { Table } from "@tanstack/react-table";
import styles from "./index.module.less";

const MainPageMobile = ({ table }: { table: Table<any> }) => {
  return (
    <div className={styles.wishes}>
      <MainPageNews />
      <MainWishesIndexMobile table={table}/>
    </div>
  );
};

export default MainPageMobile;
