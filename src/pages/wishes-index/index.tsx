import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import type { UserInfoDto, WishPaginationDto } from "../../api/model";

import type { SortingState } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { columns } from "../../components/table-columnDefs/wishes";
import { useResize } from "../../common/hooks";
import { WishesIndexDesktop } from "../wishes-index-desktop";
import { WishesIndexMobile } from "../wishes-index-mobile";

export const WishesIndex = () => {
  const userInfo = useRouteLoaderData("app") as UserInfoDto;

  const wishes = useLoaderData() as {
    body: WishPaginationDto;
    error: any;
  };

  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: true },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: wishes.body?.elements || [],
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

  const tabs = [
    {
      id: 0,
      title: "Все",
      counter: wishes.body?.elements?.length || 0,
      onClick: () => {
        console.log("click");
      },
    },
    {
      id: 1,
      title: "Мои просьбы",
      counter:
        wishes.body?.elements?.reduce(
          (acc, cur) => (cur.executor?.id === userInfo?.id ? acc + 1 : acc),
          0
        ) || 0,
      onClick: () => {
        console.log("click");
      },
    },
    {
      id: 2,
      title: "Я исполнитель",
      counter:
        wishes.body?.elements?.reduce(
          (acc, cur) =>
            (cur.wishExecutors?.reduce(
              (a, c) => (c.executor?.id === userInfo?.id ? a + 1 : a),
              0
            ) || 0) + acc,
          0
        ) || 0,
      onClick: () => {
        console.log("click");
      },
    },
  ];

  const isMobile = useResize();

  return isMobile ? (
    <WishesIndexMobile
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      table={table}
      tabs={tabs}
    />
  ) : (
    <WishesIndexDesktop
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      table={table}
      tabs={tabs}
    />
  );
};
