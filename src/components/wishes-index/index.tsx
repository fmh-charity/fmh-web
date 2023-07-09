import { Link, useLoaderData } from "react-router-dom";
import type { WishDto, WishPaginationDto } from "../../api/model";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const WishesIndex = () => {
  const wishes = useLoaderData() as {
    body: WishPaginationDto;
    error: any;
  };

  const columnHelper = createColumnHelper<WishDto>();

  const columns = [
    columnHelper.accessor("patient", {
      header: () => <span>patient</span>,
      cell: (props) => {
        // eslint-disable-next-line react/prop-types
        console.log(props, props.getValue());
        return "cell";
      },
    }),
  ];

  const table = useReactTable({
    data: wishes.body?.elements || [],
    columns,
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
