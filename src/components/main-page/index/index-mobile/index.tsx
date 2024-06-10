import MainPageNews from "../../news";
import { MainWishesIndexMobile } from "../../wishes/wishes-mobile";
import { Table } from "@tanstack/react-table";

const MainPageMobile = ({ table }: { table: Table<any> }) => {
  return (
    <div>
      <MainPageNews />
      <MainWishesIndexMobile table={table} />
    </div>
  );
};

export default MainPageMobile;
