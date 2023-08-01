import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import type { PatientByStatusRs, UserInfoDto } from "../../api/model";

import type { SortingState } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { columns } from "../../components/table-columnDefs/patients";
import { useResize } from "../../common/hooks";
import { PatientsIndexDesktop } from "../patients-index-desktop";
import { PatientsIndexMobile } from "../patients-index-mobile";

export const PatientsIndex = () => {
  const userInfo = useRouteLoaderData("app") as UserInfoDto;

  const patients = useLoaderData() as {
    body: PatientByStatusRs[];
    error: any;
  };

  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: true },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: patients.body || [],
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
      counter: patients.body?.length || 0,
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
    {
      id: 2,
      title: "В хосписе",
      counter: 0,
      onClick: () => {
        console.log("click");
      },
    },
    {
      id: 3,
      title: "Выписан",
      counter: 0,
      onClick: () => {
        console.log("click");
      },
    },
  ];

  const isMobile = useResize();

  return isMobile ? (
    <PatientsIndexMobile
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      table={table}
      tabs={tabs}
    />
  ) : (
    <PatientsIndexDesktop
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      table={table}
      tabs={tabs}
    />
  );
};
