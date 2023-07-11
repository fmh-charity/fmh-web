import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import type { WishDto } from "../../api/model";
import { statuses } from "../../common/statuses";
import * as dayjs from "dayjs";

const columnHelper = createColumnHelper<WishDto>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => <span>№</span>,
    cell: (props) => <span>{props.getValue()}</span>,
  }),
  columnHelper.accessor("title", {
    header: () => <span>Просьба</span>,
    cell: (props) => (
      <span>
        <Link to={`${props.row.original.id}`}>{props.getValue()}</Link>
      </span>
    ),
  }),
  columnHelper.accessor("planExecuteDate", {
    header: () => <span>Выполнить до</span>,
    cell: (props) => {
      const date = props.getValue();
      if (date) return <span>{dayjs.unix(date).format()}</span>;
    },
  }),
  columnHelper.accessor(
    (row) => {
      const { firstName, lastName, middleName } = row.patient || {};
      return (
        [firstName, lastName, middleName].filter(Boolean).join(" ") || "Хоспис"
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
    cell: (props) => (
      <span>{statuses[props.getValue() as keyof WishDto["status"]]}</span>
    ),
  }),
  columnHelper.accessor("executor", {
    header: () => <span>Испонитель</span>,
    cell: (props) => <span>{props.getValue()?.lastName}</span>,
  }),
];
