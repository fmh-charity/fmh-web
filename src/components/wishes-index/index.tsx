/* eslint-disable react/prop-types */
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import type { UserInfoDto, WishDto, WishPaginationDto } from "../../api/model";

import type { SortingState } from "@tanstack/react-table";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableSection } from "../table-section";
import { useState } from "react";
import { Button } from "../button";
import { Icon } from "../icon";

import styles from "./index.module.less";
import { boolean } from "superstruct";

export const WishesIndex = () => {
  const userInfo = useRouteLoaderData("app") as {
    body?: UserInfoDto;
    error?: any;
  };

  const wishes = useLoaderData() as {
    body: WishPaginationDto;
    error: any;
  };

  const [sorting, setSorting] = useState<SortingState>([
    { id: "title", desc: true },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper<WishDto>();

  const columns = [
    columnHelper.accessor("id", {
      header: () => <span>№</span>,
      cell: (props) => <span>{props.getValue()}</span>,
    }),
    columnHelper.accessor("title", {
      header: () => <span>Просьба</span>,
      cell: (props) => <span>{props.getValue()}</span>,
    }),
    columnHelper.accessor("planExecuteDate", {
      header: () => <span>Выполнить до</span>,
      cell: (props) => <span>{props.getValue()}</span>,
    }),
    columnHelper.accessor(
      (row) => {
        const { firstName, lastName, middleName } = row.patient || {};
        return (
          [firstName, lastName, middleName].filter(boolean).join(" ") ||
          "Хоспис"
        );
      },
      {
        id: "patient",
        header: () => <span>Для кого</span>,
        cell: (props) => {
          return <span>{props.getValue()}</span>;
        },
      }
    ),
    columnHelper.accessor("status", {
      header: () => <span>Статус</span>,
      cell: (props) => {
        return props.getValue();
      },
    }),
    columnHelper.accessor("executor", {
      header: () => <span>Испонитель</span>,
      cell: (props) => <span>{props.getValue()?.lastName}</span>,
    }),
  ];

  const table = useReactTable({
    data: wishes.body?.elements || [],
    columns,
    enableSortingRemoval: false,
    state: {
      sorting,
      globalFilter,
      columnVisibility: {
        executor: userInfo?.body?.admin || false,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={styles.wishes}>
      <TableSection
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        table={table}
        tabs={<div>tabs</div>}
        buttons={
          <>
            <Button intent="primary" Icon={Icon.Plus16}>
              Добавить Просьбу
            </Button>
          </>
        }
      />
      <pre>{JSON.stringify(wishes, null, 2)}</pre>
    </div>
  );
};
