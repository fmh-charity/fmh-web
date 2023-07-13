import { createColumnHelper } from "@tanstack/react-table";
import type { WishDto } from "../../api/model";
import { statuses } from "../../common/statuses";
import * as dayjs from "dayjs";

const columnHelper = createColumnHelper<WishDto>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => "№",
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor("title", {
    header: () => "Просьба",
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor(
    (row) =>
      row.planExecuteDate
        ? dayjs.unix(row.planExecuteDate).format("DD.mm.YYYY")
        : "",
    {
      id: "planExecuteDate",
      header: () => "Выполнить до",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor(
    ({ patient }) => {
      const { firstName, lastName, middleName } = patient || {};
      return (
        [firstName, lastName, middleName].filter(Boolean).join(" ") || "Хоспис"
      );
    },
    {
      id: "patient",
      header: () => "Для кого",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor(
    (row) =>
      row.status ? statuses[row.status as keyof WishDto["status"]] : "",
    {
      id: "status",
      header: () => "Статус",
      cell: (props) => props.getValue(),
    }
  ),
  columnHelper.accessor("executor", {
    header: () => "Испонитель",
    cell: (props) => props.getValue()?.lastName,
  }),
];
