import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import type { UserInfoDto } from "../../api/model";
import type { SortingState } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "../../components/table-columnDefs/users";
import { useResize } from "../../common/hooks";
import { UsersIndexMobile } from "../users-index-mobile";
import { UsersIndexDesktop } from "../users-index-desktop";

export const UsersIndex = () => {
  const userInfo = useRouteLoaderData("app") as UserInfoDto;
  console.log(userInfo, 'userInfo')
  const users = useLoaderData() as {
    body: UserInfoDto[];
    error: any;
  };

  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: true },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: users.body || [],
    columns,
    enableSortingRemoval: false,
    state: {
      sorting,
      globalFilter,
      columnVisibility: {
        executor: userInfo?.admin || false, // TODO
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
      counter: users.body?.length || 0,
      onClick: () => {
        console.log("click");
      },
    },
    {
      id: 1,
      title: "Новый",
      counter: 0,
      onClick: () => {
        console.log("click");
      },
    },
  ];

  const isMobile = useResize();

  return isMobile ? (
    <UsersIndexMobile
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      table={table}
      tabs={tabs}
    />
  ) : (
    <UsersIndexDesktop
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      table={table}
      tabs={tabs}
    />
  );
};
