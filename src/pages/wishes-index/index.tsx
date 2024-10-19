import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import type { UserInfoDto, WishDto, WishPaginationDto } from "../../api/model";

import type { SortingState } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { columns } from "../../components/table-columnDefs/wishes";
import { useResize } from "../../common/hooks";
import { WishesIndexDesktop } from "../wishes-index-desktop";
import { WishesIndexMobile } from "../wishes-index-mobile";

type FilterType = "ALL" | "ME_AUTHOR" | "ME_EXECUTOR";

export const WishesIndex = () => {
  const userInfo = useRouteLoaderData("app") as UserInfoDto;

  const wishes = useLoaderData() as {
    body: WishPaginationDto;
    error: any;
  };

  const [wishesData, setWishesData] = useState<WishDto[]>(wishes.body?.elements || []);
  const [filter, setFilter] =  useState<FilterType>("ALL");

  const [globalFilter, setGlobalFilter] = useState("");

  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: true },
  ]);

  useEffect(() => {
    if (filter === "ALL") {
      setWishesData(wishes.body.elements || []);
    } else if (filter === "ME_AUTHOR") {
      setWishesData(wishes.body?.elements?.filter(item => item?.creator?.id === userInfo.id) || []);
    } else if (filter === "ME_EXECUTOR") {
    setWishesData(wishes.body?.elements
        ?.filter(item => {
          return item?.wishExecutors?.some(executorObj => executorObj.executor?.id === userInfo.id);
        }) || []);
    }
  }, [wishes.body.elements, filter]);



  const table = useReactTable({
    data: wishesData || [],
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
        setFilter("ALL");
      },
    },
    {
      id: 1,
      title: "Мои просьбы",
      counter:
        wishes.body?.elements?.reduce(
          (acc, cur) => (cur.creator?.id === userInfo?.id ? acc + 1 : acc),
          0
        ) || 0,
      onClick: () => {
        setFilter("ME_AUTHOR");
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
        setFilter("ME_EXECUTOR");
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
