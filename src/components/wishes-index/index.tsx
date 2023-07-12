/* eslint-disable react/prop-types */
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
        tabs={
          <div>
            <div>Все {wishes.body?.elements?.length || 0}</div>
            <div>
              Мои просьбы{" "}
              {wishes.body?.elements?.reduce(
                (acc, cur) =>
                  cur.executor?.id === userInfo.body?.id ? acc + 1 : acc,
                0
              )}
            </div>
            <div>
              Я испонитель{" "}
              {wishes.body.elements?.reduce(
                (acc, cur) =>
                  (cur.wishExecutors?.reduce(
                    (a, c) =>
                      c.executor?.id === userInfo?.body?.id ? a + 1 : a,
                    0
                  ) || 0) + acc,
                0
              )}
            </div>
          </div>
        }
        buttons={
          <>
            <ButtonLink intent="primary" Icon={Icon.Plus16} to="create">
              Добавить Просьбу
            </ButtonLink>
          </>
        }
      />
      <pre>{JSON.stringify(wishes, null, 2)}</pre>
    </div>
  );
};
