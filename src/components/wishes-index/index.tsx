import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import type { UserInfoDto, WishPaginationDto } from "../../api/model";

import type { SortingState } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableSection } from "../table-section";
import { useState } from "react";
import { Icon } from "../icon";

import styles from "./index.module.less";
import { ButtonLink } from "../button-link";
import { columns } from "../../columnDefs/wishes";
import { useResize } from "../../common/hooks";
import { TableSectionMobile } from "../table-section-mobile";

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
      title: "Я испонитель",
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

  return (
    <div className={styles.wishes}>
      {isMobile ? (
        <TableSectionMobile
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
          tabs={tabs}
          buttons={
            <>
              <Icon.Filter24 />
              <ButtonLink intent="primary" Icon={Icon.Plus16} to="create" />
            </>
          }
        />
      ) : (
        <TableSection
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          table={table}
          tabs={tabs}
          buttons={
            <>
              <ButtonLink intent="primary" Icon={Icon.Plus16} to="create">
                Добавить просьбу
              </ButtonLink>
            </>
          }
        />
      )}
    </div>
  );
};
