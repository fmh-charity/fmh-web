import { MainWishesIndexDesktop } from "../../wishes/wishes-desktop";
import MainPageNews from "../../news";
import type { Table } from "@tanstack/react-table";

const MainPageDesktop = ({ table }: { table: Table<any> }) => {
  return (
    <div>
      <MainPageNews />
      <MainWishesIndexDesktop table={table} />
    </div>
  );
};

export default MainPageDesktop;
