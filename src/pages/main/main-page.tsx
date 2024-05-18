import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { useMemo } from "react";
import type { UserInfoDto, WishDto, WishPaginationDto } from "../../api/model";
import {
  SortingState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { useResize } from "../../common/hooks";
import { columns } from "../../components/table-columnDefs/wishes";
import { WishesIndexMobile } from "../wishes-index-mobile";
import { MainWishesIndexDesktop } from "../../components/main-page-wishes-desktop";

export const MainPage = () => {
  const userInfo = useRouteLoaderData("app") as UserInfoDto;

  const wishes = useLoaderData() as {
    body: WishPaginationDto;
    error: any;
  };

  const wishesList = wishes.body.elements;

  const filteredWishes = useMemo(() => {
    const filterWishes = (wishesList: WishDto[]) => {
      const filteredData = wishesList.filter(
        (wish) => wish.status === "OPEN" && wish.planExecuteDate !== undefined
      );
      filteredData.sort((a, b) => a.planExecuteDate! - b.planExecuteDate!);
      return filteredData.slice(0, 3);
    };
    return filterWishes(wishesList!);
  }, [wishesList]);

  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: filteredWishes || [],
    columns,
    enableSortingRemoval: false,
    state: {
      sorting,
      globalFilter,
      columnVisibility: {
        executor: userInfo?.admin || false,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const isMobile = useResize();
  return isMobile ? (
    <WishesIndexMobile
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      table={table}
      tabs={[]}
    />
  ) : (
    <>
      <MainWishesIndexDesktop
        table={table}
      />
    </>
  );
};
