import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import type { PatientByStatusRs, UserInfoDto } from "../../api/model";

import type { SortingState } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { columns } from "../../components/table-columnDefs/patients";
import { useResize } from "../../common/hooks";
import { PatientsIndexDesktop } from "../patients-index-desktop";
import { PatientsIndexMobile } from "../patients-index-mobile";

type FilterType = "ALL" | "EXPECTED" | "ACTIVE" | "DISCHARGED";

export const PatientsIndex = () => {
  const userInfo = useRouteLoaderData("app") as UserInfoDto;

  const patientsRaw = useLoaderData() as {
    body: PatientByStatusRs[];
    error: any;
  };

  const [patients, setPatients] = useState<PatientByStatusRs[]>(patientsRaw.body);

  const [globalFilter, setGlobalFilter] = useState("");
  const [filter, setFilter] =  useState<FilterType>("ALL");

  const [sorting, setSorting] = useState<SortingState>([
    { id: "id", desc: true },
  ]);

  useEffect(() => {
    if (filter === "ALL") {
      setPatients(patientsRaw.body);
    } else {
      setPatients(patientsRaw.body.filter(item => item.status === filter));
    }
  }, [patientsRaw.body, filter]);

  const table = useReactTable({
    data: patients,
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
      onClick: () => { 
        setFilter("ALL");
      },
      counter: patientsRaw.body?.length || 0,
    },
    {
      id: 1,
      title: "Новый",
      onClick: () => { 
        setFilter("EXPECTED");
      },
      counter: patientsRaw.body?.reduce(
        (acc, cur) => (cur?.status === "EXPECTED" ? acc + 1 : acc),
        0
      ) || 0,
    },
    {
      id: 2,
      title: "В хосписе",
      onClick: () => { 
        setFilter("ACTIVE");
      },
      counter: patientsRaw.body?.reduce(
        (acc, cur) => (cur?.status === "ACTIVE" ? acc + 1 : acc),
        0
      ) || 0,
    },
    {
      id: 3,
      title: "Выписан",
      onClick: () => { 
        setFilter("DISCHARGED");
      },
      counter: patientsRaw.body?.reduce(
        (acc, cur) => (cur?.status === "DISCHARGED" ? acc + 1 : acc),
        0
      ) || 0,
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
