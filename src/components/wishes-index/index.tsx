/* eslint-disable react/prop-types */
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import type { UserInfoDto, WishDto, WishPaginationDto } from "../../api/model";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const WishesIndex = () => {
  const userInfo = useRouteLoaderData("app") as {
    body?: UserInfoDto;
    error?: any;
  };

  const wishes = useLoaderData() as {
    body: WishPaginationDto;
    error: any;
  };

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
    columnHelper.accessor("patient", {
      header: () => <span>Для кого</span>,
      cell: (props) => {
        const { firstName, lastName, middleName } = props.getValue() || {};
        if (firstName || lastName || middleName) {
          return (
            <span>
              {firstName} {lastName} {middleName}
            </span>
          );
        }
        return "Хоспис";
      },
    }),
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
    state: {
      columnVisibility: {
        executor: userInfo?.body?.admin || false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      wishes
      {wishes.body.elements?.map((e) => (
        <div key={e.id}>
          <Link to={`${e.id}`}>{e.title}</Link>
        </div>
      ))}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(wishes, null, 2)}</pre>
    </div>
  );
};
